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
        <f7-block style="display: flex; flex-direction: column; justify-content: space-around; align-items: center; text-align: center">
            <h1 v-html="news.title"></h1>
            <span style="color: gray;">{{date}} <span style="color: gray;">by <a style="text-decoration: underline" :href="/user/+news.by">{{news.by}}</a></span></span>

            <f7-link :href="news.url" external> {{news.url}}</f7-link>
        </f7-block>

        <f7-block-title>
            commentaires ({{commentsCount}})
        </f7-block-title>

        <f7-list v-if="comments" media-list>
            <f7-list-item v-for="(c,index) in comments"

            >
                <f7-card class="demo-facebook-card">
                    <f7-card-header class="no-border">
                        <div class="demo-facebook-name"><a style="color: black; text-decoration: underline" :href="/user/ + c.by">{{c.by}}</a></div>
                        <div class="demo-facebook-date">{{moment((c.time*1000)).startOf('hour').fromNow()}}</div>
                    </f7-card-header>
                    <f7-card-content >
                        <p class="external" style="font-weight: 300; overflow-x: scroll" v-html="c.text"></p>
                    </f7-card-content>
                    <f7-card-footer class="no-border">
                    </f7-card-footer>
                </f7-card>
            </f7-list-item>
        </f7-list>
        <f7-block style="text-align: center">
            <span v-if="!comments" >No comments at the moment !</span>
        </f7-block>


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
                comments: [],
                commentsCount: 0,

            }

        },
        mounted() {
            let stories = this.news
            this.$f7ready((f7) => {

                f7.request.get('https://hacker-news.firebaseio.com/v0/item/' + this.id + '.json', data => {

                    this.news = JSON.parse(data)
                    this.date  = moment((this.news.time * 1000)).startOf('hour').fromNow()
                    if(this.news.kids !== undefined) {
                        this.commentsCount = this.news.kids.length
                    let commentsList = this.news.kids.slice(0,10)

                        commentsList.forEach(comment => {
                            f7.request.get('https://hacker-news.firebaseio.com/v0/item/' + comment + '.json', data => {
                                this.comments.push(JSON.parse(data))
                            })
                        });
                    }
                    else this.comments = false



                })

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