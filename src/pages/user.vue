<template>
    <f7-page name="news">
        <f7-navbar>
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
        <f7-block
                style="display: flex; flex-direction: column; justify-content: space-around; align-items: center; text-align: center">
            <h1>user : {{news.id}}</h1>
            <span style="color: gray;">created : {{date}} </span>
            <span style="color: gray;"> karma : {{news.karma}}</span>
            <span style="color: gray">about : <span :v-html="news.about"></span></span>
            <span>submission ({{submitted}})</span>
        </f7-block>

        <f7-block-title>
            Latest Submissions
        </f7-block-title>

        <f7-list  media-list>
            <f7-list-item v-for="(s,index) in subs"
            >
                <f7-card class="demo-facebook-card">
                    <f7-card-header class="no-border">
                        <div class="demo-facebook-name"><p>type : {{s.type}}</p></div>
                        <div class="demo-facebook-date">{{moment((s.time*1000)).startOf('hour').fromNow()}}</div>
                    </f7-card-header>
                    <f7-card-content style="font-weight: 300; overflow-x: scroll">
                        <h1>{{s.title}}</h1>
                        <p class="external" v-html="s.text"></p>
                        <p class="external"><a :href="s.url" class="external" >{{s.url}}</a> </p>
                    </f7-card-content>
                    <f7-card-footer class="no-border">
                    </f7-card-footer>
                </f7-card>
            </f7-list-item>
        </f7-list>


    </f7-page>
</template>

<script>
    import * as moment from 'moment';

    export default {
        data() {
            return {
                news: {},
                id: this.$f7route.params.id,
                date: null,
                submitted: null,
                subs: []

            }

        },
        mounted() {
            let stories = this.news
            this.$f7ready((f7) => {

                f7.request.get('https://hacker-news.firebaseio.com/v0/user/' + this.id + '.json', data => {

                    this.news = JSON.parse(data)
                    this.submitted = this.news.submitted.length
                    this.date = moment((this.news.created * 1000)).startOf('hour').fromNow()

                    this.news.submitted.slice(0, 10).forEach(subs => {
                        f7.request.get('https://hacker-news.firebaseio.com/v0/item/' + subs + '.json', sub => {
                            this.subs.push(JSON.parse(sub))
                        })
                    })

                });

            });

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