<template>
    <div class="kudouIndex">
        <div class="IndexContent">
            <div class="bannerKu">
                <div class="mainKu">
                    <div class="bannerTop">
                        <!--<img :src="indexDataKudou.index_title_img" @click="" class="smallKu">-->
                        <img @click="" class="smallKu" src="http://images.sooyooj.com/20190725/go98wrnCRDAM6e7p.png">
                        <div class="bannerRight" v-if="userInfoKudou.tel_num">
                            <img :src="userInfoKudou.head_portrait" class="iconKu">
                            <div class="userNameKu">{{userInfoKudou.tel_num}}</div>
                            <div class="userId">ID:{{uidKudou}}</div>
                            <div class="flexBox">
                                {{indexDataKudou.balance}}
                                <img src="http://images.sooyooj.com/20190624/8n4lzD7TQoFRh6L2.png">
                            </div>
                            <div @click="withdrawAction" class="tixian">「提现」</div>
                            <div @click="toUserAction" class="joinBtn">个人中心</div>
                        </div>
                        <div class="bannerRight" v-else>
                            <img :src="userInfoKudou.head_portrait" class="iconKu">
                            <div class="userNameKu">{{userInfoKudou.username}}</div>
                            <a @click="showLogin">手机号登录</a>
                            <div @click="tokudouActivity(gameData[0].id)" class="joinBtn">参与活动，领取金币换现金</div>
                        </div>
                    </div>
                    <div class="bannerBottom">
                        <!--<img :src="indexDataKudou.index_center_img">-->
                        <img src="http://images.sooyooj.com/20190722/hSASyoX1VsTFVGJN.png">
                        <ul>
                            <li>
                                <span class="number">{{indexDataKudou.total_grant_rmb}}</span>
                                <span>元人民币</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="contentKu">
                <div class="titleKu2">
                    <img src="http://images.sooyooj.com/20190808/LER8p3hDO2JAzs1w.png">
                    <h2 class="tryKu">全部游戏</h2>
                </div>
                <div class="allGame">
                    <ul>
                        <li :class="allgameIndex==index?'active':''" :key="index" @click="allgameAction(index,item.id)"
                            v-for="(item,index) in gameType">
                            {{item.name}}
                            <img src="http://images.sooyooj.com/20190805/hA3lXlldVzFoJ4pn.png"
                                 v-show="allgameIndex==index">
                        </li>
                    </ul>
                    <div class="swiperBox">
                        <div class="swiper-container swiperAllgame">
                            <div class="swiper-wrapper">
                                <div :key="index" @click="tokudouActivity(item.id)"
                                     class="swiper-slide" style="width: 91px; margin-right: 30px;"
                                     v-for="(item,index) in seoGameLists">
                                    <div class="box">
                                        <img :src="item.small_icon">
                                        <span>{{item.game_name}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="titleKu">
                    <img class="imgKu" src="http://images.sooyooj.com/20190621/iXmDUwaUYxo6ssC3.png">
                    <h2 class="tryKu">热门试玩</h2>
                    <div class="swiperList">
                        <div class="swiper-container swiperTiXian">
                            <div class="swiper-wrapper">
                                <div :key="index" class="swiper-slide" v-for="(item,index) in rankingData">
                                    <img src="http://images.sooyooj.com/20190621/QsWw0kS5RQHYV1Dw.png">
                                    <p>{{item.name}}用户提现了<span>{{item.num}}元</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hotPlayBox">
                    <div :key="index" @click="tokudouActivity(item.id)" class="hotPlay"
                         v-for="(item,index) in gameData">
                        <img :alt="item.game_name" :src="item.icon" class="imgIcon">
                        <div class="tryRight">
                            <h3 class="titleTry">{{item.game_name}}</h3>
                            <div class="label">{{item.game_area_cloth[0]}}</div>
                            <div class="predict">预计收益:<span>{{item.anticipated_income}}</span>元</div>
                            <div class="startBtn">
                                <div class="leftText">
                                    <div><img class="eye"
                                              src="http://images.sooyooj.com/20190621/MBjW6vPHvg28VjeG.png"><span>2341</span>
                                    </div>
                                    <div><img src="http://images.sooyooj.com/20190621/gpHfXOqR0efLBzQi.png"><span>{{item.update_time}}</span>
                                    </div>
                                </div>
                                <a>开始玩</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="titleKu2">
                    <img src="http://images.sooyooj.com/20190621/pQr0iAXv9AvFvxch.png">
                    <h2 class="tryKu">游戏试玩</h2>
                </div>
                <div class="typeBox">
                    <div class="content">
                        <div class="type">
                            <strong>金额：</strong>
                            <span :class="typeIndex==index?'active':''" :key="index"
                                  @click="clickmoneyAction(index,item.id)" v-for="(item,index) in moneyType">{{item.name}}</span>
                        </div>
                        <div class="type">
                            <strong>游戏类型：</strong>
                            <span :class="typeIndex1==index?'active':''" :key="index"
                                  @click="clicktypeAction(index,item.id)"
                                  v-for="(item,index) in gameType">{{item.name}}</span>
                        </div>
                        <div class="type">
                            <strong>字母排序：</strong>
                            <span :class="(index==gamepyindex)?'active':''" @click="clickpyAction(index)"
                                  v-for="(item,index) in gamepy">{{item}}</span>
                        </div>
                    </div>
                </div>
                <div class="hotPlayBox">
                    <div :key="index" @click="tokudouActivity(item.id)" class="hotPlay"
                         v-for="(item,index) in gameList">
                        <img :alt="item.game_name" :src="item.icon" class="imgIcon">
                        <div class="tryRight">
                            <h3 class="titleTry">{{item.game_name}}</h3>
                            <div class="label">{{item.game_area_cloth[0]}}</div>
                            <div class="predict">预计收益:<span>{{item.anticipated_income}}</span>元</div>
                            <div class="startBtn">
                                <div class="leftText">
                                    <div>
                                        <img class="eye"
                                             src="http://images.sooyooj.com/20190621/MBjW6vPHvg28VjeG.png"><span>10000</span>
                                    </div>
                                    <div>
                                        <img src="http://images.sooyooj.com/20190621/gpHfXOqR0efLBzQi.png"><span>{{item.update_time}}</span>
                                    </div>
                                </div>
                                <a>开始玩</a>
                            </div>
                        </div>
                    </div>

                    <div @click="loadMoreData" class="loadMoreBtn">{{loadText}}</div>
                </div>
                <div class="titleKu2">
                    <img src="http://images.sooyooj.com/20190808/MN3CbIWkHyvVqPjm.png">
                    <h2 class="tryKu">游戏攻略</h2>
                </div>
                <div class="strategyBox">
                    <div class="gameLeft">
                        <div class="strategy">
                            <div :key="index" @click="toDetails(item.id,item.game_type_id)"
                                 class="strategyItem" v-for="(item,index) in strategyData">
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
                            <div :key="index" @click="toDetails(item.id,item.game_type_id)" class="list"
                                 v-for="(item,index) in standAloneData">
                                <i></i>
                                <div class="labels">
                                    {{item.article_describe}}
                                </div>
                            </div>
                        </div>
                        <div class="gameTitle">
                            <div class="titleL">
                                <i></i>
                                <p>手游排行攻略</p>
                            </div>
                            <div class="titleR">
                                <span>最新排行</span>
                            </div>
                        </div>
                        <div class="listBox">
                            <div :key="index" @click="toDetails(item.id,item.game_type_id)" class="list"
                                 v-for="(item,index) in handTourData">
                                <i></i>
                                <div class="labels">
                                    {{item.article_describe}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="titleKu2">
                    <img src="http://images.sooyooj.com/20190808/9MhueIn48ebtwb1C.png">
                    <h2 class="tryKu">友情链接</h2>
                </div>
                <div class="friendlyBox">
                    <div class="selectList">
                        <i></i>
                        <ul>
                            <li :class="friendlyIndex==index?'actiivty':''" :key="index"
                                @click="selectAction(index)" v-for="(item,index) in friendly">{{item}}
                            </li>
                        </ul>
                    </div>
                    <div class="teamwork" v-show="friendlyIndex===0">
                        <img alt="搜游记" src="http://images.sooyooj.com/20190806/ujXQvQVMOWH9SokP.png">
                    </div>
                    <div class="friendlyLine" v-show="friendlyIndex===1">
                        <a href="http://www.sooyooj.com/" target="_blank">搜游记</a>
                    </div>
                </div>

                <div class="toots" ref="toots">
                    <div :class="toolsKf?'active':''" @click="onlineService" @mouseenter="toolsKf=true"
                         @mouseleave="toolsKf=false"
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
        <message-online-service @OnlineShowFalse="OnlineShowFalse" v-show="onlineShow"></message-online-service>
        <!--<bind-phone @bgShowFlase="bgShowFlase" v-show="bingPhoneShow"></bind-phone>-->
        <kudou-login @cancelShowFlase="cancelShowFlase" v-show="kudouLoginShow"></kudou-login>
        <kudou-withdraw @initUserData="initUserData" @withdrawShowFlase="withdrawShowFlase"
                        v-if="withdrawShow"></kudou-withdraw>
    </div>
</template>

<script>
    import axios from 'axios'
    import {mapGetters} from 'vuex'
    // import BindPhone from '~/components/BindPhone/BindPhone.vue'
    import KudouLogin from '~/components/kudouLogin/kudouLogin.vue'
    import MessageOnlineService from '~/components/MessageOnlineService/MessageOnlineService.vue'
    import KudouWithdraw from '~/components/KudouWithdraw/KudouWithdraw.vue'

    export default {
        async asyncData(Context) {
            let [getGame, getGameArticle, getGameMoneyType, getGameType, getTrialWithdrawalRank] = await Promise.all([
                // 全部游戏
                axios({
                    method: 'get',
                    url: 'http://api.ikudou.com/api/index/getGame',
                    params: {
                        page: 1,
                        listRows: 100,
                    }
                })
                .then(function (response) {
                    return response.data.data[0]
                }),
                //游戏攻略
                axios({
                    method: 'get',
                    url: 'http://api.ikudou.com/api/index/getGameArticle',
                    params: {
                        page: 1,
                        listRows: 10,
                        article_type: 0
                    }
                })
                .then(function (response) {
                    return response.data.data[0]
                }),
                //游戏金额分类
                axios({
                    method: 'get',
                    url: 'http://api.ikudou.com/api/index/getGameMoneyType',
                    params: {}
                })
                .then(function (response) {
                    var res = response.data.data.unshift({name: "不限"})
                    return response.data.data
                }),
                //游戏类型分类
                axios({
                    method: 'get',
                    url: 'http://api.ikudou.com/api/index/getGameType',
                    params: {}
                })
                .then(function (response) {
                    var res = response.data.data.unshift({name: "不限", id: ''});
                    return response.data.data
                }),
                //小广告轮播
                axios({
                    method: 'get',
                    url: 'http://api.ikudou.com/api/index/getTrialWithdrawalRank',
                    params: {page: 1, listRows: 6}
                })
                .then(function (response) {
                    return response.data.data
                })
            ]);

            let resSort = getGame.sort(function (a, b) {
                return b.sort - a.sort
            });

            return {
                seoGameLists: getGame,
                gameData: resSort.slice(0, 4),
                gameList: getGame,
                strategyData: getGameArticle[1].slice(0, 3),
                standAloneData: getGameArticle[2].slice(0, 8),
                handTourData: getGameArticle[3].slice(0, 8),
                moneyType: getGameMoneyType,
                gameType: getGameType,
                rankingData: getTrialWithdrawalRank
            }
        },
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
                        content: '手机游戏,好玩的手机游戏,游戏试玩,网赚平台'
                    },
                ]
            }
        },
        data() {
            return {
                strategyData: [],
                standAloneData: [],
                handTourData: [],
                seoGameLists: [],
                withdrawShow: false,
                loadText: "点击加载更多",
                rankingData: [],
                data: {
                    page: 1,
                    listRows: 10
                },
                gameData: [],
                gameList: [],
                kudouLoginShow: false,
                bingPhoneShow: false,
                scrolltopShow: false,
                onlineShow: false,
                toolsKf: false,
                moneyType: [],
                typeIndex: 0,
                typeIndex1: 0,
                gamepyindex: 0,
                allgameIndex: 0,
                friendlyIndex: 0,
                pyListindex: -1,
                gameType: [],
                gamepy: ['不限', 'ABCDE', 'FGHIJ', 'KLMNO', 'PQRST', 'UVWXYZ'],
                friendly: ['合作商家', '友情链接']

            }
        },
        computed: {
            ...mapGetters(["userInfoKudou", "indexDataKudou", "uidKudou", "tokenKudou"]),
        },
        components: {
            MessageOnlineService,
            // BindPhone,
            KudouLogin,
            KudouWithdraw
        },
        methods: {
            initGameArticle() {
                var parem = {
                    page: 1,
                    listRows: 10,
                    article_type: 0 //0所有 1游戏攻略 2单机排行 3手游排行
                };
                this.$getKudou('/api/index/getGameArticle', parem).then(data => {
                    if (data.code == 200) {
                        // var res=data.data[0];
                        this.strategyData = data.data[0][1].slice(0, 3)
                        this.standAloneData = data.data[0][2].slice(0, 8)
                        this.handTourData = data.data[0][3].slice(0.8)
                    }
                })
            },
            toDetails(id, typeid) {
                var path = '/strategydetail?id=' + id + '&typeid=' + typeid
                window.open(path)
            },
            selectAction(index) {
                this.friendlyIndex = index;
            },
            allgameAction(index, id) {
                this.allgameIndex = index;
                var parem = {
                    page: 1,
                    listRows: 100,
                    game_type_id: id
                };
                this.seoGameList(parem)

            },
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
            withdrawAction() {
                this.withdrawShow = true;
            },
            withdrawShowFlase(val) {
                this.withdrawShow = val
            },
            initUser() {
                this.$postKudou("/api/user/register", {token: $store.state.tokenKudou}).then(data => {
                    if (data.code == 200) {
                        this.$store.dispatch("uidKudou", data.data.uid);
                        this.$store.dispatch("userInfoKudou", data.data);
                        this.$store.dispatch("tokenKudou", data.data.password);

                        localStorage.setItem("userInfoKudou", JSON.stringify(data.data))
                        this.setcookie("userInfoKudou", JSON.stringify(data.data), "90")
                    } else if (data.code == 403) {
                        this.initToken()
                        this.initUser()
                    } else {
                        this.$message.error(data.msg, {
                            duration: 1000,
                        });
                    }
                })
            },
            toUserAction() {
                window.open('/user')
            },
            initUserData() {
                this.$getKudou("/api/user/getUserMsg", {uid: this.uidKudou, token: this.tokenKudou}).then(data => {
                    if (data.code == 200) {
                        this.$store.dispatch("indexDataKudou", data.data);

                    } else if (data.code == 401) {
                        //过期
                        this.initUser();
                    } else if (data.code == 403) {
                        this.initToken();
                        this.initUserData();
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
            loadMoreData() {
                this.data.listRows = this.data.listRows + 10;
                this.initGameList(this.data);
            },
            onlineTime() {
                this.$getKudou("/api/index/getGameMoneyType").then(data => {
                    if (data.code == 200) {
                        this.moneyType = data.data;
                        this.moneyType.unshift({
                            name: "不限"
                        });
                    }
                })
            },
            initGameType() {
                this.$getKudou("/api/index/getGameType").then(data => {
                    if (data.code == 200) {
                        this.gameType = data.data;
                        this.gameType.unshift({
                            name: "不限",
                            id: ''
                        });
                    }
                })
            },
            sortBy(a, b) {
                return b.sort - a.sort
            },
            seoGameList(d) {
                this.$getKudou("/api/index/getGame", d).then(data => {
                    if (data.code == 200) {
                        this.seoGameLists = data.data[0];
                    }
                })
            },
            initGameList(d, bool) {
                this.$getKudou("/api/index/getGame", d).then(data => {
                    if (data.code == 200) {
                        this.gameList = data.data[0];
                        let allCount = data.data.allCount;
                        if (allCount > d.listRows) {
                            this.loadText = "点击加载更多"
                        } else {
                            this.loadText = "没有更多了"
                        }

                        if (bool) {
                            //  全部游戏、
                            this.seoGameLists = data.data[0]
                            //热门试玩
                            let arr = this.deepCopy(data.data[0]).sort(this.sortBy);
                            this.gameData = arr.slice(0, 4);
                        }

                    }
                })
            },
            tokudouActivity(id) {
                var path = "/kudouactivity?id=" + id + '&uid=' + this.uidKudou;
                window.open(path)
            },
            showLogin() {
                this.kudouLoginShow = true;
            },
            cancelShowFlase(val) {
                this.kudouLoginShow = val;
            },
            bgShowFlase(val) {
                this.bingPhoneShow = val;
            },
            scrolltopAction() {
                if ((document.body.scrollTop || document.documentElement.scrollTop) !== 0) {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
            },
            OnlineShowFalse(val) {
                this.onlineShow = val;
            },
            onlineService() {
                this.onlineShow = true;
            },
            clickmoneyAction(i, id) {
                this.typeIndex = i;
                this.data.listRows = 10;

                this.data.game_money_type = id
                this.initGameList(this.data);
            },
            clicktypeAction(i, id) {
                this.typeIndex1 = i;
                this.data.listRows = 10;

                this.data.game_type_id = id;
                this.initGameList(this.data);
            },
            clickpyAction(i) {
                this.gamepyindex = i;
                this.data.listRows = 10;
                if (i == 0) {
                    this.data.game_initial = '';
                } else if (i == 1) {
                    this.data.game_initial = 'A,B,C,D,E'
                } else if (i == 2) {
                    this.data.game_initial = 'F,G,H,I,J'
                } else if (i == 3) {
                    this.data.game_initial = 'K,L,M,N,O'
                } else if (i == 4) {
                    this.data.game_initial = 'P,Q,R,S,T'
                } else if (i == 5) {
                    this.data.game_initial = 'U,V,W,X,Y,Z'
                }
                this.initGameList(this.data);
            }

        },
        created() {
        },
        mounted() {
            this.initGameArticle();
            this.onlineTime();
            this.initGameType();
            this.initGameList(this.data, true);
            this.initRanking();
            var that = this;
            window.onscroll = function (e) {
                var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
                if (that.$route.path == '/') {
                    if (scrolltop >= 0 && scrolltop < 1900) {
                        that.$refs.toots.style.top = scrolltop + 50 + "px"
                    } else if (scrolltop >= 1900) {
                        that.$refs.toots.style.top = 1920 + "px"
                    }
                }
            }
            setTimeout(function () {
                var mySwiper = new Swiper('.swiperTiXian', {
                    direction: 'vertical',
                    autoplay: {
                        delay: 1000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    loop: true,
                });
                var swiper = new Swiper('.swiperAllgame', {
                    slidesPerView: 10,
                    spaceBetween: 30,
                    freeMode: true,
                    // loop: true,
                    autoplay: {
                        delay: 2000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                });
            }, 500)
        }

    }
</script>
<style scoped lang="scss">
    @import "../assets/css/index.scss";
</style>
