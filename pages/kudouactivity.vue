<template>
    <div class="activityDetail">
        <div class="mainActivity">
            <h2 class="bread">
                当前位置: <a>首页 > </a>活动详情
            </h2>
            <div class="imgBoxs">
                <!--<img :src="indexDataKudou.index_center_img" class="imgIcon">-->
                <img src="http://images.sooyooj.com/20190722/hSASyoX1VsTFVGJN.png" class="imgIcon">
                <ul>
                    <li>{{indexDataKudou.total_grant_rmb}}</li>
                </ul>
            </div>
            <div class="activityContent">
                <div class="activityLeft">
                    <div class="typeGame">
                        <img :alt="detailData.game_name" :src="detailData.small_icon">
                        <div class="rightKu">
                            <h3 class="subje">{{detailData.game_name}}</h3>
                            <div :key="index" class="table" v-for="(item,index) in detailData.game_area_cloth">
                                {{item}}
                            </div>
                            <div class="btnGroud">
                                <div @click="startGame(detailData.game_link)"
                                     class="tryBtn"
                                     v-show="status==0 || status ==2|| status==3|| status==4  || status==5">开启试玩任务
                                </div>
                                <div @click="toFinish" class="finishBtn" v-if="status==4">完成任务</div>
                                <div @click="toFinish" class="finishBtn" v-if="status==5">完成任务</div>
                                <div class="endBtn" v-if="status==1">任务已完成</div>
                            </div>
                        </div>
                        <div @click="cancelOrder(detailData.order_id)" class="cancelBtn" v-if="status==4">
                            取消订单
                        </div>
                    </div>
                    <div class="informTitle">
                        <i></i>
                        <span>试玩规则</span>
                    </div>
                    <div class="tryPlay">
                        <div class="list dowtime">
                            倒计时：
                            <span>{{day}}</span>
                            天
                            <span>{{hour}}</span>
                            时
                            <span>{{minute}}</span>
                            分
                            <span>{{second}}</span>
                            秒
                        </div>
                        <div class="list">试玩时间：{{detailData.start_time}} 至 {{detailData.end_time}}</div>
                        <div class="list range">试玩范围：仅限“<span>{{detailData.scope}}</span>”，参与其他服将无法获得金币奖励</div>
                        <div class="list">奖励说明：{{detailData.award_show}}</div>
                        <div class="list">温馨提示：{{detailData.warm_prompt}}</div>
                        <div class="list">预计收益：</div>
                        <div class="list numRed"><p><span>{{detailData.anticipated_income}}</span>元</p></div>
                    </div>
                    <div class="informTitle">
                        <i></i>
                        <span>产品说明</span>
                    </div>
                    <div class="textProduct">{{detailData.description}}</div>
                </div>
                <div class="activityRight">
                    <div class="topCode" v-show="status==0">
                        <img src="http://images.sooyooj.com/20190725/lprKRq29sc69GT62.png">
                    </div>
                    <div class="topCode" v-show="status!==0">
                        <div class="code" id="game_ewm"></div>
                        <div class="textLine">手机扫码也可完成任务哦~</div>
                    </div>
                    <div class="botRanking">
                        <div class="titleBox">
                            <img src="http://images.sooyooj.com/20190625/ZuIj9JASmRZhGTq4.png">
                            <span>试玩提现排名</span>
                        </div>
                        <div class="contentBox">
                            <ul>
                                <li class="headerTab">
                                    <div>排名</div>
                                    <div>试玩角色名</div>
                                    <div>试玩等级</div>
                                </li>
                                <li :key="index" class="list" v-for="(item,index) in rankingData">
                                    <div class="bgImg">{{index+1}}</div>
                                    <div>{{item.name}}</div>
                                    <div>{{item.level}}</div>
                                </li>
                            </ul>
                            <p class="tips">*每个小时更新数据一次</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <kudou-perform :detailData="detailData" @perShowFlase="perShowFlase" v-show="performShow"></kudou-perform>
        <bind-phone @bgShowFlase="bgShowFlase" v-show="bingPhoneShow"></bind-phone>
    </div>
</template>

<script type="text/javascript">
    import axios from 'axios'
    import {mapGetters} from 'vuex'
    import KudouPerform from '~/components/KudouPerform/KudouPerform'
    import BindPhone from '~/components/BindPhone/BindPhone.vue'

    export default {
        // async fetch(Context) {
        //  //返回数据
        //     return axios({
        //         method: 'get',
        //         url: 'http://api.ikudou.com/api/index/gameDetails',
        //         params: {
        //             game_id: Context.route.query.id,
        //             uid:Context.route.query.uid
        //         }
        //     }).then(res => {
        //         Context.store.dispatch("detailData", res.data.data);
        //         return res.data.data
        //     })
        //
        // },
        async asyncData(Context) {
            let [getTrialWithdrawalRank,gameDetails] = await Promise.all([
                axios({
                    method: 'get',
                    url: 'http://api.ikudou.com/api/index/getTrialWithdrawalRank',
                    params:{
                        page: 1,
                        listRows: 6
                    }
                })
                .then(function (response) {

                    return response.data.data
                }),
                axios({
                    method: 'get',
                    url: 'http://api.ikudou.com/api/index/gameDetails',
                    params: {
                        game_id: Context.route.query.id,
                        uid:Context.route.query.uid
                    }
                }).then(res => {
                    return res.data.data
                })
            ])

            return {
                rankingData:getTrialWithdrawalRank,
                detailData:gameDetails

            }

        },
        head () {
            return {
                title:this.detailData.game_name + '_手机'+this.detailData.game_type+'游戏'+this.detailData.game_name +'试玩_酷豆平台',
                meta: [
                    {
                        hid: 'keyWords',
                        name: 'keyWords',
                        content:this.detailData.game_name+','+this.detailData.game_type+'游戏'+this.detailData.game_name+','+this.detailData.game_name+'试玩，玩'+ this.detailData.game_name+'赚钱，酷豆平台'
                    },
                    {
                        hid: 'description',
                        name: 'description',
                        content: '想玩'+this.detailData.game_type+'游戏'+this.detailData.game_name+'就上酷豆平台，酷豆试玩游戏网赚平台,提供当下火爆好玩的手机游戏与网赚攻略，做任务赚积分参与活动等多种方式赚钱,还可以越换各种奖品,轻松游戏，快乐赚钱。'

                    }
                ]
            }
        },
        data() {
            return {
                bingPhoneShow: false,
                performShow: false,
                id: this.$route.query.id || "",
                 detailData: {},
                day: "00",
                hour: "00",
                minute: "00",
                second: "00",
                rankingData: [],
                status: ""//0用户没有订单，1通过，2未通过，3等待审核，4未提交任务，5取消订单
            }
        },
        computed: {
            ...mapGetters(["indexDataKudou", "uidKudou", "tokenKudou"])
        },
        components: {
            KudouPerform,
            BindPhone
        },
        methods: {
            initToken() {
                this.$getKudou('/api/token/getToken', {uid: this.uidKudou}).then(data => {
                    if (data.code == 200) {
                        let token = data.data + 'abcdase';
                        this.$store.dispatch("tokenKudou", this.$md5(token));
                    } else if (data.code == 403) {
                        this.initToken()
                    }
                })
            },
            initQrcode() {
                // 生成二维码
                let domwx = document.getElementById("game_ewm");
                let urlwx = this.detailData.game_link + "&uid=" + this.uidKudou;
                //
                domwx.innerHTML = '';
                this.qrcode_local(
                    urlwx,
                    domwx,
                    155,
                    155,
                    "#000000",
                    "#fff"
                );
            },
            bgShowFlase(val) {
                this.bingPhoneShow = val;
            },
            cancelOrder(orderId) {
                this.$confirm('此操作将取消订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$postKudou("/api/game/cancelOrder?num="+Math.round(Math.random()*10), {
                        order_id: orderId,
                        uid: this.uidKudou,
                        token: this.tokenKudou
                    }).then(data => {
                        if (data.code == 200) {
                            this.$message.success(data.msg, {
                                duration: 1000,
                            });
                            this.initData();

                        } else if (data.code == 403) {
                            this.initToken()
                            this.cancelOrder()
                        } else {
                            this.$message.error(data.msg, {
                                duration: 1000,
                            });
                        }
                    })
                }).catch(() => {
                    // this.$message({
                    //   type: 'info',
                    //   message: '已取消删除'
                    // });
                });
            },
            perShowFlase(val) {
                this.performShow = val;
                location.reload()
            },
            toFinish() {
                //是否绑定手机
                if (this.indexDataKudou.tel_num) {
                    this.performShow = true
                } else {
                    this.bingPhoneShow = true;
                }

            },
            countDownData(endTime) {
                let that = this;
                var timer = null;
                timer = setInterval(function () {
                    var str = endTime.split('-')
                    //获取目的日期
                    var myyear = str[0];
                    var mymonth = parseInt(str[1]) - 1;
                    var myday = str[2];
                    var myhour = 0;
                    var myminute = 0;
                    var mysecond = 0;
                    // var time=Number(new Date(myyear,mymonth,myday,myhour,myminute,mysecond));
                    var time = new Date(myyear, mymonth, myday, myhour, myminute, mysecond).getTime();
                    //获取当前时间
                    // var nowTime=Date.now();
                    var nowTime = new Date().getTime();
                    var timediff = Math.round((time - nowTime) / 1000);
                    var day = parseInt(timediff / 3600 / 24);
                    var hour = parseInt(timediff / 3600 % 24);
                    var minute = parseInt(timediff / 60 % 60);
                    var second = timediff % 60;
                    //输出还剩多少时间
                    if (day <= 0) {
                        day = 0
                    }
                    if (hour <= 0) {
                        hour = 0
                    }
                    if (minute <= 0) {
                        minute = 0
                    }
                    if (second <= 0) {
                        second = 0
                    }

                    that.day = day;
                    that.hour = hour;
                    that.minute = minute;
                    that.second = second;
                    if (timediff == 0) {
                        clearInterval(timer);
                    }
                }, 1000);
            },
            initData() {
                this.$getKudou("/api/index/gameDetails?num="+Math.round(Math.random()*100), {game_id: this.id, uid: this.uidKudou}).then(data => {
                    if (data.code == 200) {
                        this.detailData = data.data;
                        this.status = data.data.status;
                        this.countDownData(data.data.end_time)
                    }
                })
            },
            initRanking() {
                this.$getKudou("/api/index/getTrialWithdrawalRank", {page: 1, listRows: 6}).then(data => {
                    if (data.code == 200) {
                        this.rankingData = data.data;
                    }
                })
            },
            createOrder() {
                this.$postKudou("/api/game/createOrder", {
                    game_id: this.id,
                    uid: this.uidKudou,
                    token: this.tokenKudou
                }).then(data => {
                    if (data.code == 200) {
                        this.$message.success("生成订单成功", {
                            duration: 600,
                        });
                            this.initData();
                    } else if (data.code == 403) {
                        this.initToken();
                        this.createOrder()
                    }
                })
            },
            startGame(game_link) {
                this.createOrder();
                setTimeout(() => {
                    location.reload()
                    var path = game_link + "&uid=" + this.uidKudou;
                    window.open(path)
                }, 300)
            }

        },
        created() {
        },
        mounted() {
            this.initRanking();
            this.initData();

            let that = this;
            setTimeout(() => {
                that.initQrcode();
            }, 500)
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/kudouactivity.scss";
</style>
