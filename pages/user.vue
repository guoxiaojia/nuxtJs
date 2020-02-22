<template>
    <div class="kudouUser">
        <div class="bannerUser">
            <div class="mainKudou">
                <div class="imgIcon">
                    <img :src="indexDataKudou.head_portrait">
                </div>
                <div class="rightText">
                    <div class="titleVip">{{ indexDataKudou.username}}(ID:{{indexDataKudou.id}})</div>
                    <div class="moneyBox">
                        <div class="leftSum">
                            <div class="qian">金币账户:</div>
                            <div class="boxKu">
                                <div class="shuzi">{{indexDataKudou.balance}}</div>
                                <div class="danwei">金币</div>
                                <div class="bottomKu">
                                    <img src="http://images.sooyooj.com/20190624/8n4lzD7TQoFRh6L2.png">
                                    <span>可折合：{{indexDataKudou.balanceDiscount}}元</span>
                                    <div @click="withdrawAction" class="btnGetMoney">提现</div>
                                </div>
                            </div>
                        </div>
                        <div class="rigthAll">
                            <div class="qian">累计收益:</div>
                            <div class="boxKu">
                                <div class="shuzi">{{indexDataKudou.accumulatedIncome}}</div>
                                <div class="danwei">金币</div>
                                <div class="bottomKu">
                                    <img src="http://images.sooyooj.com/20190624/8n4lzD7TQoFRh6L2.png">
                                    <span>可折合：{{indexDataKudou.AID}}元</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapContent">
            <div class="mainContent">
                <div class="manuLists">
                    <div :class="activty==0?'activty':''" @click="manuAction(0)" class="list">
                        <i class="geRen"></i>
                        <span>个人中心</span>
                    </div>
                    <div :class="activty==1?'activty':''" @click="manuAction(1)" class="list">
                        <i class="dinDan"></i>
                        <span>我的订单</span>
                    </div>
                    <div :class="activty==2?'activty':''" @click="manuAction(2)" class="list">
                        <i class="zhican"></i>
                        <span>我的资产</span>
                    </div>
                </div>
                <div class="compBox">
                    <component :is="componentsName" @manuAction="manuAction"></component>
                </div>

                <div class="toots" ref="toots">
                    <div :class="toolsKf?'active':''" @click="onlineService" @mouseenter="toolsKf=true" @mouseleave="toolsKf=false"
                         class="img">
                        <i class="kefu" v-show="toolsKf==false"></i>
                        <span v-show="toolsKf">联系客服</span>
                    </div>
                    <div :class="scrolltopShow?'active':''" @click="scrolltopAction" @mouseenter="scrolltopShow=true"
                         @mouseleave="scrolltopShow=false" class="img">
                        <i class="jiantou" v-show="scrolltopShow==false"></i>
                        <span v-show="scrolltopShow">回到顶部</span>
                    </div>
                </div>
            </div>
        </div>
        <message-online-service :logoName='logoName' @OnlineShowFalse="OnlineShowFalse"
                                v-show="onlineShow"></message-online-service>
        <bind-phone @bgShowFlase="bgShowFlase" v-show="bingPhoneShow"></bind-phone>
        <kudou-withdraw @initUserData="initUserData" @withdrawShowFlase="withdrawShowFlase"
                        v-if="withdrawShow"></kudou-withdraw>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import KudouPersonal from '~/components/User/KudouPersonal.vue';
    import KudouOrder from '~/components/User/KudouOrder.vue';
    import KudouAssets from '~/components/User/KudouAssets.vue';
    import MessageOnlineService from '~/components/MessageOnlineService/MessageOnlineService';
    import BindPhone from '~/components/BindPhone/BindPhone.vue'
    import KudouWithdraw from '~/components/KudouWithdraw/KudouWithdraw.vue'

    export default {
        head() {
            return {
                title: "游戏试玩_好玩的手机游戏网赚平台_免费h5手游试玩赚钱平台",
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: '在线试玩游戏网赚平台,提供当下火爆好玩的手机游戏，做任务赚积分参与活动等多种方式赚钱,还可以越换各种奖品,轻松游戏，快乐赚钱。'
                    },
                    {
                        hid: 'keyWords',
                        name: 'keyWords',
                        content: '在线试玩游戏网赚平台,提供当下火爆好玩的手机游戏，做任务赚积分参与活动等多种方式赚钱,还可以越换各种奖品,轻松游戏，快乐赚钱。'
                    },
                ]
            }
        },
        data() {
            return {
                withdrawShow: false,
                activty: this.$route.query.type || 0,//type=0,1,2
                componentsName: "",
                toolsKf: false,
                onlineShow: false,
                logoName: '酷豆',
                scrolltopShow: false,
                bingPhoneShow: false,
            }
        },
        computed: {
             ...mapGetters(["uidKudou", "tokenKudou", "indexDataKudou"])
        },
        components: {
            KudouPersonal,
            KudouOrder,
            KudouAssets,
            MessageOnlineService,
            BindPhone,
            KudouWithdraw
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
            withdrawShowFlase(val) {
                this.withdrawShow = val
            },
            bgShowFlase(val) {
                this.bingPhoneShow = val;
            },
            withdrawAction() {
                if (this.indexDataKudou.tel_num) {
                    //提现
                    this.withdrawShow = true;
                } else {
                    //绑定手机
                    this.bingPhoneShow = true;
                }
            },
            initUserData() {
                this.$getKudou("/api/user/getUserMsg", {uid: this.uidKudou, token: this.tokenKudou}).then(data => {
                    if (data.code === 200) {
                        this.$store.dispatch("indexDataKudou", data.data);
                    } else if (data.code === 403) {
                        this.initToken();
                        this.initUserData();
                    }
                })
            },
            initcomponentsName() {
                if (this.$route.query.type === 0) {
                    this.componentsName = KudouPersonal;
                } else if (this.$route.query.type == 1) {
                    this.componentsName = KudouOrder;
                } else if (this.$route.query.type == 2) {
                    this.componentsName = KudouAssets;
                } else {
                    this.componentsName = KudouPersonal;
                }

            },
            manuAction(index) {
                this.activty = index;
                if (index === 0) {
                    this.componentsName = KudouPersonal;
                } else if (index === 1) {
                    this.componentsName = KudouOrder;
                } else if (index === 2) {
                    this.componentsName = KudouAssets;
                }
            },
            OnlineShowFalse(val) {
                this.onlineShow = val;
            },
            onlineService() {
                this.onlineShow = true;
            },
            scrolltopAction() {
                if ((document.body.scrollTop || document.documentElement.scrollTop) != 0) {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
            },
        },
        created() {

        },
        mounted() {
             this.initcomponentsName();
            var that = this
            window.onscroll = function (e) {
                var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
                if (that.$route.path == '/kudouuser.html') {
                    if (scrolltop >= 0 && scrolltop < 1500) {
                        that.$refs.toots.style.top = scrolltop + 100 + "px"
                    } else if (scrolltop >= 1500) {
                        that.$refs.toots.style.top = 1530 + "px"
                    }
                }
            }
        }

    }
</script>
<style scoped lang="scss">
    @import "../assets/css/user.scss";
</style>
