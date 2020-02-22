<template>
  <div class="kudouFooter">
    <div class="footer">
      <div class="middle">
        <ul>
          <li><a>关于我们</a></li>
          <li><a @click="showUserAgree">用户协议</a></li>
          <li><a @click="showMap" class="last">网站地图</a></li>
        </ul>
        <a class="beian" href="http://icp.chinaz.com/info?q=ikudou.com" target="_blank">备案号 &nbsp;粤ICP备17142163号-1</a>
        <div class="reminder">
          抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排游戏时间 享受健康生活
          本游戏适合18岁以上用户 不含血腥暴力、恐怖、色情等妨害未成年人身心健康内容<br>
          纠纷处理方式：联系客服或依照《<a @click="showUserAgree">用户协议</a>》的约定方式处理
        </div>
      </div>
    </div>
   <user-agreement  v-if="showUserAgreement" @ShowUserFlase = "ShowUserFlase"></user-agreement>
  </div>
</template>

<script>
  import UserAgreement from '~/components/Footer/UserAgreement'
  export default {
    data(){
      return{
        showUserAgreement:false,

      }
    },
    components:{
      UserAgreement
    },
    methods:{
        showMap(){
           window.open('http://ikudou.com/sitemap.xml')
        },
      showUserAgree(){
        this.showUserAgreement = true;
      },
      ShowUserFlase(val){
        this.showUserAgreement = val;
      },

    },
    created() {
    }

  }
</script>
