<template>
    <transition name="fade">
        <div class="wrap">
            <div class="cont">
                <div class="title">
                    <div>登录</div>
                    <span @click="cancel" class="close">x</span>
                </div>
                <div class="input">
                    <div class="ground num">
                        <input placeholder="手机号码" v-model="tel">
                    </div>
                    <div class="ground yzm">
                        <input placeholder="验证码" v-model='phonecode'>
                        <span @click="numClickShow&&yzmAction()">{{codeval}}</span>
                    </div>
                </div>
                <div class="userAgreement">
                    <div :class="checkedFlag?'act':''" @click='checkAction' class="radio">✔</div>
                    <div class="textRadio">
                        我已阅读并接受
                        <a @click="showUserAgree">《酷豆用户协议》</a>
                        及
                        <a @click="showPrivacyAction">《隐私政策》</a>
                    </div>
                </div>
                <div class="b">
                    <div @click='bgAction' class="bd">登录游戏</div>
                </div>
                <div class="other">
                    <!--<div class="line">其它登录方式</div>-->
                    <!--<ul class="wx_qq_phone">-->
                    <!--<li @click='qqLogin'>-->
                    <!--<img src="http://images.sooyooj.com/20190219/KO5MogK4ElAU2Sf0.png" alt="">-->
                    <!--<div>QQ</div>-->
                    <!--</li>-->
                    <!--<li @click='wxLogin'>-->
                    <!--<img src="http://images.sooyooj.com/20190219/4aI4Nhl4FyXBpMnG.png" alt="">-->
                    <!--<div>微信</div>-->
                    <!--</li>-->
                    <!--</ul>-->
                </div>
            </div>
            <div @click="cancel" class="bg"></div>
            <user-agreement @ShowUserFlase="ShowUserFlase" v-if="showUserAgreement"></user-agreement>
            <privacy-policy @ShowPrivacyFlase="ShowPrivacyFlase" v-if="ShowPrivacy"></privacy-policy>
        </div>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex';
    import PrivacyPolicy from '~/components/Footer/PrivacyPolicy.vue';
    import UserAgreement from '~/components/Footer/UserAgreement.vue';

    export default {
        data() {
            return {
                ShowPrivacy: false,
                showUserAgreement: false,
                checkedFlag: true,
                codeval: '发送',
                tel: '',
                numClickShow: true,
                num: 60,
                time: null,
                successCode: false,
                numClickShow: true,
                phonecode: '',
            }
        },
        computed: {
            ...mapGetters(["uidKudou", "tokenKudou"])
        },
        components: {
             UserAgreement,
            PrivacyPolicy
        },
        methods: {
            ShowPrivacyFlase(val) {
                this.ShowPrivacy = val
            },
            showPrivacyAction() {
                this.ShowPrivacy = true
            },
            showUserAgree() {
                this.showUserAgreement = true;
            },
            ShowUserFlase(val) {
                this.showUserAgreement = val;
            },
            checkAction() {
                this.checkedFlag = !this.checkedFlag;
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
            qqLogin() {

            },
            wxLogin() {

            },
            cancel() {
                this.$emit("cancelShowFlase", false);
                this.tel = '';
                this.phonecode = '';
            },
            yzmAction() {
                if (this.phoneText()) {
                    this.$postKudou("/api/user/sendNote", {
                        tel_num: this.tel,
                        uid: this.uidKudou,
                        token: this.tokenKudou
                    }).then(data => {
                        if (data.code == 200) {
                            this.successCode = true;
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                duration: 1000,
                                type: "success"
                            });
                        } else if (data.code == 403) {
                            this.initToken();
                            this.yzmAction();
                        } else {
                            this.$message.error(data.msg, {
                                duration: 1000,
                            });
                        }
                    })
                }
            },
            phoneText() {
                this.tel = this.tel.trim();
                if (this.tel == "") {
                    this.$message.error("请输入手机号码", {
                        duration: 1000
                    });
                    return false;
                }
                return true;
            },
            bgAction() {
                if (this.checkedFlag == false) {
                    this.$message.error("请勾选阅读并同意《用户协议》", {
                        duration: 1000,
                        showClose: true,
                    });
                    return
                }
                if (this.phoneText()) {
                    this.$postKudou("/api/login/telLogin", {
                        tel_num: this.tel,
                        code: this.phonecode,
                        uid: this.uidKudou,
                        token: this.tokenKudou
                    }).then(data => {
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                duration: 1000,
                                type: "success"
                            });
                            this.$store.dispatch("uidKudou", data.data.id);
                            this.$store.dispatch("tokenKudou", data.data.password);
                            let res = this.deepCopy(data.data);
                            res.uid =data.data.id
                            this.$store.dispatch("userInfoKudou", res);
                            localStorage.setItem("userInfoKudou", JSON.stringify(res));
                            this.setcookie("userInfoKudou",JSON.stringify(res),"90",true)
                             window.location.reload()
                        } else if (data.code == 403) {
                            this.initToken();
                            this.bgAction();
                        } else {
                            this.$message.error(data.msg, {
                                duration: 1000,
                            });
                        }
                    })
                }
            },
        },
        created() {

        },
        watch: {
            num() {
                if (this.num <= 0) {
                    this.num = 60;
                    clearInterval(this.time);
                    this.successCode = false;
                    this.codeval = "重新获取验证码";
                    this.numClickShow = true;
                }
            },
            successCode() {
                if (this.successCode) {
                    this.numClickShow = false;
                    this.time = setInterval(() => {
                        this.num--;
                        this.codeval = "获取验证码成功" + this.num + "s";
                    }, 1000);
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .wrap {
        width: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        overflow-y: hidden;
    }

    .bg {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        background: rgba(000, 000, 000, 0.4);
    }

    .wrap .cont {
        width: 350px;
        padding-bottom: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        background: #fff;
        border-radius: 4px;
    }

    .wrap .cont .title {
        position: relative;

        div {
            height: 60px;
            line-height: 60px;
            text-align: center;
            color: #515151;
            font-size: 16px;
        }
    }

    .wrap .cont .title .close {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 20px;
        color: #E1E1E1;
        cursor: pointer;

        &:hover {
            color: #757575;
        }
    }

    .wrap .cont .input {
        padding: 0 15px;
    }

    .wrap .cont .input .ground {
        width: 100%;
        border: 1px solid #e5e5e5;
        margin-bottom: 15px;
        border-radius: 4px;
        position: relative;
    }

    .wrap .cont .input .ground input {
        background: transparent;
        border: none;
        height: 34px;
        width: 100%;
        text-indent: 30px;
    }

    .wrap .cont .input .ground span {
        display: inline-block;
        cursor: pointer;
        height: 34px;
        line-height: 34px;
        font-size: 14px;
        position: absolute;
        right: 14px;
        color: #FEAE09;
    }

    .wrap .cont .num {
        background: url("http://images.sooyooj.com/20190624/8MatyEcmxa9dBTdG.png") no-repeat 8px 8px;
        background-size: 12px 18px;
    }

    .wrap .cont .yzm {
        display: flex;
        justify-content: space-between;
        background: url("http://images.sooyooj.com/20190624/84X0VUI9mvwvtO4c.png") no-repeat 8px 8px;
        background-size: 12px 18px;
    }

    .userAgreement {
        display: flex;
        align-items: center;
        padding: 0 15px 15px;

        .radio {
            width: 14px;
            height: 14px;
            line-height: 14px;
            text-align: center;
            border-radius: 50%;
            color: #fff;
            font-size: 12px;
            cursor: pointer;
            border: 1px solid #FEAE09;
            background: #fff;
        }

        .radio.act {
            /*background: #4597F9;*/
            background: #FEAE09;
        }

        .textRadio {
            margin-left: 6px;
            font-size: 12px;
            color: #B2B2B2;

            a {
                text-decoration: underline;
                cursor: pointer;
                color: #FEAE09;

            }
        }
    }

    .wrap .cont .b {
        padding: 0 15px;
    }

    .wrap .cont .b .bd {
        width: 100%;
        background: #FEAE09;
        color: #fff;
        height: 42px;
        line-height: 42px;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
    }

    .wrap {
        .other {
            padding: 0 15px;
        }

        .line {
            margin-top: 21px;
            position: relative;
            font-size: 12px;
            text-align: center;
            color: #E0E0E0;
        }

        .line:before {
            content: "";
            height: 1px;
            position: absolute;
            top: 50%;
            width: 33%;
            left: 0;
            background: rgba(224, 224, 224, 0.5);
        }

        .line:after {
            content: "";
            height: 1px;
            position: absolute;
            top: 50%;
            width: 33%;
            right: 0;
            background: rgba(224, 224, 224, 0.5);
        }

        .wx_qq_phone {
            padding: 0 15px;
            display: flex;
            justify-content: space-around;
            text-align: center;
            margin-top: 10px;

            li {
                cursor: pointer;

                div {
                    height: 22px;
                    line-height: 22px;
                    font-size: 12px;
                    padding-bottom: 6px;
                    color: #E0E0E0;
                }
            }
        }
    }


    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
