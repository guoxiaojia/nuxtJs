<template>
    <div class="kudouHeader">
        <div class="headerLeft">
            <img class="logoKu" src="http://images.sooyooj.com/20190620/3AHzNod5CWH0zvar.png">
            <div class="allNumber">
                <div class="tipText">
                    <img class="qianbao" src="http://images.sooyooj.com/20190620/ad7S7z5bYN5amBdU.png">
                    <span>累计提现人数</span>
                </div>
                <div class="numKu">
                    <ul>
                        <li>{{indexDataKudou.total_withdrawal}}</li>
                    </ul>
                </div>
            </div>
            <div class="menus">
                <ul>
                    <li>
                        <nuxt-link  to="/" >
                            首页
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/gamestrategy" >
                            游戏攻略
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link  @click.native='navClikcAction()'  to="/user" >
                            个人中心
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div>
            </div>
        </div>
        <div class="headerRight" @click="toUser" :style="userInfoKudou.tel_num?'marginRight:56px':''">
            <img class="imgIcon" :src="userInfoKudou.head_portrait">
            <div class="userNam" v-if="userInfoKudou.tel_num" >{{userInfoKudou.tel_num}} <span @click.stop="logoutAction">「退出」</span></div>
            <div class="userNam" v-else >{{userInfoKudou.username}}</div>
        </div>
        <kudou-login v-show="kudouLoginShow" @cancelShowFlase="cancelShowFlase"></kudou-login>
    </div>
</template>

<script>
   import {mapGetters} from 'vuex'
  import  KudouLogin from '~/components/kudouLogin/kudouLogin.vue'

  export default {
    data(){
      return{
        kudouLoginShow:false,
        kudouuser:"/user",
      }
    },
    computed:{
       ...mapGetters(["userInfoKudou","indexDataKudou","uidKudou","tokenKudou","isServer"])
    },
    components:{
       KudouLogin
    },
      methods:{
          logoutAction() {
              this.$store.dispatch("logout");
              window.location='/'
          },
          cancelShowFlase(val){
              this.kudouLoginShow=val;
          },
          initUserData(){
              this.$getKudou("/api/user/getUserMsg?num="+Math.round(Math.random()*100),{uid:this.uidKudou,token:this.tokenKudou}).then(data=>{
                  if(data.code==200){
                      this.$store.dispatch("indexDataKudou", data.data);
                  }else if(data.code==401){
                      //过期
                      this.initUser();
                  }else if(data.code==403){
                      this.initToken();
                      this.initUserData();
                  }
              })
          },
          initToken(){
              this.$getKudou('/api/token/getToken',{uid:this.uidKudou}).then(data=>{
                  if(data.code==200){
                      let token=data.data+'abcdase';
                      this.$store.dispatch("tokenKudou", this.$md5(token));
                  }else if(data.code==403){
                      this.initToken()
                  }
              })
          },
          navClikcAction(){
              let that=this
              this.$router.beforeEach((to, from, next) => {
                  if (to.path === "/user") {
                      if (that.userInfoKudou.tel_num) {
                          next()
                      } else {
                          // this.$message({
                          //   message: "请先绑定手机号",
                          //   type: "error",
                          //   duration:"1500"
                          // });
                           that.kudouLoginShow=true;
                      }
                  }else{
                      next()
                  }
              })
          },
          toUser(){
              window.open('/user');
          },
          initUser(){
              this.$postKudou("/api/user/register",{token:this.tokenKudou}).then(data=>{
                  if(data.code==200){
                      this.$store.dispatch("uidKudou", data.data.uid);
                      this.$store.dispatch("userInfoKudou", data.data);
                      // this.$Cookie.set('uidKudou', data.data.uid)
                      localStorage.setItem("userInfoKudou", JSON.stringify(data.data))
                      this.setcookie("userInfoKudou",JSON.stringify(data.data))
                  }else if(data.code==403){
                      this.initToken();
                      this.initUser()
                  }else {
                      this.$message.error(data.msg, {
                          duration: 1000,
                      });
                  }
              })
          }
      },
      created() {


      },
      mounted() {
          this.navClikcAction();

          if(this.uidKudou){
              // this.$Cookie.set('uidKudou', this.uidKudou)
              var userInfo=this.getcookie("userInfoKudou") || localStorage.getItem('userInfoKudou');
              if (userInfo) {
                  this.$store.dispatch('userInfoKudou',JSON.parse(userInfo))
              }else {
                  this.initUser();
              }

          }else {
              this.initUser();
          }
          if(!this.tokenKudou){
              this.initToken();
          }
          this.initUserData();
      }

  }
</script>
