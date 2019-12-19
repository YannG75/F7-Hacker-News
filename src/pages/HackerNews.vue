<template>
    <f7-page name="HackerNews">
        <f7-navbar >
            <div class="navbar">
                <div class="navbar-bg"></div>
                <div class="navbar-inner sliding" style="background: #ff9e33;">
                    <div class="left">
                        <a class="link back" style="color: black;">
                            <i class="icon icon-back"></i>
                            <span>Back</span>
                        </a>
                    </div>
                </div>
            </div>
        </f7-navbar>
        <f7-block-title>
            Top News
        </f7-block-title>
        <f7-list media-list>
            <f7-list-item chevron-center
                          v-for="(n,index) in news"

                          :text="moment((n.time*1000)).startOf('hour').fromNow()"
                          :link="/news/+ n.id" >
                <span v-html="n.title"></span>
            </f7-list-item>

        </f7-list>
    </f7-page>
</template>

<script>
import * as moment from 'moment';
export default {
    data() {
        return {
            news:[]
        }

    },
    mounted() {
        let stories = this.news
        this.$f7ready((f7) => {


            f7.request.get('https://hacker-news.firebaseio.com/v0/topstories.json', function (data) {

                let topStories = JSON.parse(data)
                topStories = topStories.slice(0,10)

                topStories.forEach(function (topStory) {
                    f7.request.get('https://hacker-news.firebaseio.com/v0/item/'+ topStory +'.json?',
                        function (data) {
                            return  stories.push(JSON.parse(data))

                        }
                    )


                })
            });

        });
        return  stories
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


