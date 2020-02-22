<template>
    <div class="errorBox">
        <div class="img404">
            <img src="http://images.sooyooj.com/20190810/5SztK3YrPEazXS3W.jpg">
        </div>
        <div class="notice" v-if="error">抱歉！您访问的页面不存在！</div>
        <div class="notice" v-else>404页面，服务器错误!</div>
        <a class="backBtn" @click="toHome">← 返回首页</a>
    </div>
</template>
<script>
    export default {
        props: ['error'],
        head () {
            return {
                title: "404",
                meta: [
                    { hid: 'description', name: 'description', content: '酷豆试玩游戏网赚平台,提供当下火爆好玩的手机游戏与网赚攻略，做任务赚积分参与活动等多种方式赚钱,还可以越换各种奖品,轻松游戏，快乐赚钱。' },
                    { hid: 'keyWords', name: 'keyWords', content: '手机游戏,好玩的手机游戏,游戏试玩，网赚平台' },
                ]
            }
        },
        data(){
            return{

            }
        },
        methods:{
            toHome() {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped lang="scss">
    .errorBox{
        border-top: 1px solid #eee;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 700px;
        .img404{
            padding-top: 50px;
            padding-bottom: 50px;
            img{
                width: 800px;
                height: 400px;
            }
        }
        .notice {
            text-align: center;
            font-size: 20px;
            color: #333;
            padding: 25px 0;
        }
        .backBtn{
            cursor: pointer;
            display: block;
            width: 100px;
            margin: 0 auto;
            padding: 0 20px;
            text-align: center;
            line-height: 50px;
            background: #ffd753;
            font-size: 16px;
            color: #000;
            border-radius: 5px;
            font-weight: bold;
        }
    }
</style>
