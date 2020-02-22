<template>
    <div class="info">
        <div class="main">
            <div class="wrapBox">
                <div  class="wrap">
                    <div class="title">
                        <h3>{{info.article_title}}</h3>
                        <div class="infoBox">
                            <span><img src="http://images.sooyooj.com/20190425/SVuIAdhlIIz3y0GN.png">来源：酷豆</span>
                            <span><img src="http://images.sooyooj.com/20190425/A432pdYOJUXKtrFe.png">{{info.update_time}}</span>
                        </div>
                    </div>
                    <!--<div class="bannerInfo">-->
                    <!--<div class="leftInfo">-->
                    <!--<img src="http://images.sooyooj.com/20190723/1CTbZvjwJ3ZKjao0.gif">-->
                    <!--<div>-->
                    <!--<div class="subInfo">{{info.article_title}}</div>-->
                    <!--<div class="playBox">-->
                    <!--<span>网页游戏  </span>&nbsp;|&nbsp;-->
                    <!--<span>7898人玩过</span>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--<div class="rightInfo">-->
                    <!--<div class="starBtn">开始玩</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <div class="val" id="infocontent" v-html="info.article_content"></div>

                    <div class="correlation">
                        <div class="topCorre">
                            <span class="read">相关阅读</span>
                            <!--<a target="_blank" class="more">更多></a>-->
                        </div>
                        <div class="listBox">
                            <div class="list" v-for="(item,index) in newData" :key="index" @click="toDetails(item.id,item.game_type_id)">
                                <div class="lefts">
                                    <i></i>
                                    <div>{{item.article_describe}}</div>
                                </div>
                                <div class="rights">{{item.update_time}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="gameRight">
                    <div class="gameTitle">
                        <div class="titleL">
                            <i></i>
                            <p>单机排行攻略</p>
                        </div>
                        <div class="titleR">
                            <span>人气排行</span>
                        </div>
                    </div>
                    <div class="listBox">
                        <div class="list" v-for="(item,index) in standAloneData" :key="index" @click="toDetails(item.id,item.game_type_id)">
                            <i></i>
                            <div class="labels">
                                {{item.article_describe}}
                            </div>
                        </div>
                    </div>
                    <div class="gameTitle">
                        <div class="titleL">
                            <i></i>
                            <p>本周新游攻略</p>
                        </div>
                        <div class="titleR">
                            <span>新游首看</span>
                        </div>
                    </div>
                    <div class="imgLists">
                        <div class="imgItem" v-for="(item,index) in newData2" :key="index" @click="toDetails(item.id,item.game_type_id)">
                            <img :src="item.article_icon">
                            <div class="infoBox">
                                <span class="subject">{{item.article_title}}</span>
                                <div class="type">
                                    类型:
                                    <span>{{item.hasOneGameType.name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {mapGetters} from 'vuex'
    export default {
        async asyncData(Context) {
            let [gameArticleDetails,relatedReading,getGameArticle] = await Promise.all([
                axios({
                    method: 'get',
                    url: 'http://api.ikudou.com/api/index/gameArticleDetails',
                    params:{
                       id: Context.route.query.id,
                    }
                })
                .then(function (response) {
                    return response.data.data
                }),
                axios({
                    method: 'get',
                    url: 'http://api.ikudou.com/api/index/relatedReading',
                    params:{
                        game_type_id:Context.route.query.typeid,
                        page:1,
                        listRows:4
                    }
                })
                .then(function (response) {
                    return response.data.data
                }),
                axios({
                    method: 'get',
                    url: 'http://api.ikudou.com/api/index/getGameArticle',
                    params:{
                        page:1,
                        listRows:10,
                        article_type:0
                    }
                })
                .then(function (response) {
                    return response.data.data[0]
                })

            ])

            return {
                info:gameArticleDetails,
                newData:relatedReading,
                standAloneData:getGameArticle[2],
                newData2:getGameArticle[4]
            }
        },
        head () {
            return {
                title: this.info.article_title,
                meta: [
                    { hid: 'description', name: 'description', content: this.info.article_describe },
                    { hid: 'keyWords', name: 'keyWords', content: '手机游戏,好玩的手机游戏,游戏试玩，网赚平台' },
                ]
            }
        },
        data(){
            return{
                standAloneData:[],
                newData2:[],
                id:this.$route.query.id || "",
                typeid:this.$route.query.typeid || "",
                info:{},
                newData:[]
            }
        },
        computed:{
            ...mapGetters(["token","uid"])
        },
        methods:{
            initGameArticle(){
                var parem={
                    page:1,
                    listRows:10,
                    article_type:0 //0所有
                };
                this.$getKudou('/api/index/getGameArticle',parem).then(data => {
                    if (data.code == 200) {
                        this.standAloneData=data.data[0][2];
                        this.newData2=data.data[0][4];
                    }
                })
            },
            toDetails(id,typeid){
                var path = '/strategydetail?id='+id+'&typeid='+typeid;
                 window.open(path);
                //this.$router.push(path)
            },
            initInfoData(){
                this.$getKudou('/api/index/gameArticleDetails',{id:this.id}).then(data => {
                    if (data.code == 200) {
                        this.info=data.data;
                    }
                })
            },
            initnewData(){
                var parem={
                    game_type_id:this.typeid,
                    page:1,
                    listRows:4
                };
                this.$getKudou('/api/index/relatedReading',parem).then(data => {
                    if (data.code == 200) {
                        this.newData=data.data;
                    }
                })
            },

        },
        created(){

        },
        mounted(){
            this.initInfoData();
            this.initnewData();
            this.initGameArticle()
        },
        updated() {
            var val = document.getElementById("infocontent");
            var img = val.getElementsByTagName("img");
            var p=val.getElementsByTagName("p")
            var span=val.getElementsByTagName("span")
            for (let index = 0; index < img.length; index++) {
                img[index].style.margin = "0 auto"
                img[index].style.maxWidth = "100%"
            }
            for (let i = 0; i < p.length; i++) {
                p[i].style.fontSize = 14+"px"
                p[i].style.marginBottom=4+"px"
            }
            for (let i = 0; i < span.length; i++) {
                span[i].style.lineHeight=26+"px"
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/strategydetail.scss";

</style>
