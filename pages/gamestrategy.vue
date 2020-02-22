<template>
    <div class="strategy">
        <div class="main">
            <div class="banner">
                <img src="http://images.sooyooj.com/20190806/3eBOvGm9guuLUb24.png">
            </div>
            <div class="titleKu">
                <img src="http://images.sooyooj.com/20190808/MN3CbIWkHyvVqPjm.png">
                <h2 class="tryKu">游戏攻略</h2>
            </div>
            <div class="strategyBox">
                <div class="gameLeft">
                    <div class="strategy">
                        <div class="strategyItem" @click="toDetails(item.id,item.game_type_id)" v-for="(item,index) in strategyData" :key="index">
                            <img :src="item.article_icon">
                            <div class="itemRight">
                                <div class="subject">{{item.article_title}}</div>
                                <div class="texts">
                                    {{item.article_describe}}
                                </div>
                                <p class="time">{{item.update_time}}</p>
                            </div>
                        </div>
                    </div>
                    <el-pagination background layout="prev, pager, next" prev-text="上一页" next-text="下一页" :total='allCount' :page-size='data.listRows' :current-page.sync="data.page" @current-change="handleCurrentChange" style="text-align: center">
                    </el-pagination>
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
                        <div class="imgItem" v-for="(item,index) in newData" :key="index" @click="toDetails(item.id,item.game_type_id)">
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
            let [getGameArticle] = await Promise.all([
                axios({
                    method: 'get',
                    url: 'http://api.ikudou.com/api/index/getGameArticle',
                    params:{
                        page:1,
                        listRows:8,
                        article_type:0
                    }
                })
                .then(function (response) {
                    return response.data.data[0]
                })
            ])
            return {
                strategyData:getGameArticle[1],
                standAloneData:getGameArticle[2],
                newData:getGameArticle[4]
            }
        },
        head () {
            return {
                title: "游戏网赚攻略_游戏试玩攻略_酷豆平台",
                meta: [
                    { hid: 'description', name: 'description', content: '酷豆试玩游戏网赚平台,提供当下火爆好玩的手机游戏与网赚攻略，做任务赚积分参与活动等多种方式赚钱,还可以越换各种奖品,轻松游戏，快乐赚钱。' },
                    { hid: 'keyWords', name: 'keyWords', content: '手机游戏,好玩的手机游戏,游戏试玩，网赚平台' },
                ]
            }
        },
        data(){
            return{
                standAloneData:[],
                newData:[],
                strategyData:[],
                allCount:-1,//总条数
                data:{
                    page:1,//第一页
                    listRows:8,//每页8
                    article_type:0
                },
            }
        },
        computed: {
             ...mapGetters(["userInfoKudou", "indexDataKudou", "uidKudou", "tokenKudou"])
        },
        methods:{
            initGameArticle(bool){
                this.$getKudou('/api/index/getGameArticle',this.data).then(data => {
                    if (data.code == 200) {
                        this.strategyData=data.data[0][1];
                        if(bool){
                            this.allCount=data.data.allCount;
                            this.standAloneData=data.data[0][2];
                            this.newData=data.data[0][4];
                        }
                    }
                })
            },
            toDetails(id,typeid){
                window.open('/strategydetail?id='+id+'&typeid='+typeid);
            },
            handleCurrentChange(e){
                document.documentElement.scrollTop=0;
                this.data.page=e;
                this.initGameArticle();
            }
        },
        created(){

        },
        mounted() {
            this.initGameArticle(true)
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/gamestrategy.scss";
</style>