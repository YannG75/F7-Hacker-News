<template>
  <f7-page name="home" style="background-color: #f5f5f5">
    <!-- Top Navbar -->
    <div class="navbar">
      <div class="navbar-bg"></div>
      <div class="navbar-inner sliding" style="display: flex; justify-content: center; background-color: #ff9e33">
        <div class="title" >Hacker News</div>
      </div>
    </div>
    <!-- Toolbar-->
    <!-- Page content-->
    <f7-block-title>Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/HackerNews/" title="Top stories"></f7-list-item>
      <f7-list-item link="/bestStories/" title="Best stories"></f7-list-item>

    </f7-list>
<f7-block-title>
  Latest News
</f7-block-title>
    <f7-list media-list>
      <f7-list-item  v-for="(n,index) in news"

                     chevron-center
                     :text="moment((n.time*1000)).startOf('hour').fromNow()"
                     :link="/news/+ n.id" >
        <span v-html="n.title"></span>
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>

<script>
  import * as moment from 'moment'

  export default {
    data() {
      return {
        news: []
      }

    },
    mounted() {
      let stories = this.news
      this.$f7ready((f7) => {

        f7.request.get('https://hacker-news.firebaseio.com/v0/newstories.json', function (data) {

          let topStories = JSON.parse(data)
          topStories = topStories.slice(0, 10)

          topStories.forEach(function (newstory) {
            f7.request.get('https://hacker-news.firebaseio.com/v0/item/' + newstory + '.json?',
                    function (data) {
                      return stories.push(JSON.parse(data))
                    }
            )


          })
        });
      });
      return stories
    },
    filters: {
      moment: function (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
      }
    },
    methods: {
      moment: function (date) {
        return moment(date);
      }
    }
  }

</script>