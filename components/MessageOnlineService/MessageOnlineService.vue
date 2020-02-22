<template>
    <div class="OnlineServer">
        <div class="messsgeBox">
            <div class="onlineBox">
                <img class="imgbanner" src="http://images.sooyooj.com/20190329/P34VJXpwDICQXS34.png">
                <div class="textBox">
                    <div class="tips">
                        为了对您更好的服务<br>
                        <span>酷豆</span>客服全程为您服务
                    </div>
                    <div class="items">
                        <img src="http://images.sooyooj.com/20190313/1M78LpLdmDwfqp3V.png">
                        <div class="service">
                            请拨打电话：
                            <input id="tel" :value="indexDataKudou.service_tel">
                        </div>
                        <div @click="copyAction(0)" class="copys">「复制」</div>
                    </div>
                    <div class="items">
                        <img src="http://images.sooyooj.com/20190313/1M78LpLdmDwfqp3V.png">
                        <div class="service">
                            客服QQ:
                            <input id="qq" :value="indexDataKudou.service_qq">
                        </div>
                        <div class="qqkf" v-html="indexDataKudou.onLine">
                        </div>
                        <div @click="copyAction(1)" class="copys">「复制」</div>
                    </div>
                </div>
            </div>
            <div @click="cancelBtn" class="cancelBtn">
                <span>×</span>
            </div>
        </div>
        <div @click="cancelBtn" class="bgColor"></div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {}
        },
        computed: {
            ...mapGetters(["uidKudou", "tokenKudou", "indexDataKudou"])
        },
        methods: {
            cancelBtn() {
                this.$emit('OnlineShowFalse', false);
            },
            copyAction(val) {
                var Text=''
                if(val==1){
                    Text = document.getElementById("qq");
                }else {
                    Text = document.getElementById("tel");
                }
                Text.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                this.onCopy()
            },
            onCopy() {
                this.$message({
                    message: "复制成功",
                    type: "success",
                    duration: "1500"
                });
            },

        },
        created() {
        },
        watch: {}

    }
</script>

<style lang="scss" scoped>
    .bgColor {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
    }

    .OnlineServer {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        overflow: hidden;
        z-index: 2000;

        .messsgeBox {
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            z-index: 20001;
            background: #fff;
            width: 340px;
            text-align: center;
            font-size: 16px;
            padding-bottom: 24px;
            border-radius: 6px;

            .imgbanner {
                width: 100%;
            }

            .textBox {
                font-size: 14px;
                color: #3E3E3E;

                .tips {
                    padding: 20px 0;
                    line-height: 24px;
                }

                .items {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 10px;
                    .service{
                        input{
                            max-width: 82px;
                            border: none;
                        }
                    }
                    > img {
                        width: 13px;
                        height: 13px;
                        margin-right: 10px;
                    }

                    .copys {
                        color: #5BA4FA;
                        cursor: pointer;

                        &:hover {
                            color: #FEA503;
                        }
                    }

                    .qqkf {
                        width: 20px;
                        height: 40px;
                        margin-left: 6px;

                        a {
                            width: 100%;
                            display: block;

                            img {
                                width: 100%;
                            }
                        }
                    }

                }
            }

            .cancelBtn {
                position: absolute;
                bottom: -48px;
                left: 50%;
                transform: translate(-50%, 0);

                span {
                    width: 34px;
                    height: 34px;
                    display: inline-block;
                    border-radius: 50%;
                    border: 1px solid #fff;
                    text-align: center;
                    line-height: 34px;
                    color: #fff;
                    font-size: 18px;
                    cursor: pointer;

                    &:hover {
                        border-color: #FEA503;
                        color: #FEA503;
                    }
                }
            }


        }

    }

</style>
