<template>
    <transition name="fade">
        <div class="wrap">
            <div class="cont">
                <div class="title">
                    <div>绑定手机</div>
                    <span class="close"  @click="quie">x</span>
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
                <div class="b">
                    <div class="bd" @click='bgAction'>绑定手机</div>
                </div>
              <p class="tips">*完成绑定手机方便完成任务后进行提现喔</p>
            </div>
            <div class="bg"  @click="quie"></div>
        </div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default { 
    data(){
        return{
            codeval:'发送',
            tel:'',
            numClickShow:true,
            num: 60,
            time: null,
            successCode: false,
            phonecode:''
        }
    },
    computed:{
        ...mapGetters(["uidKudou","tokenKudou"])
    },
    methods:{
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
        quie(){
            this.$emit("bgShowFlase",false);
            this.tel='';
            this.phonecode='';
        },
        yzmAction(){
          if(this.phoneText()){
            this.$postKudou("/api/user/sendNote",{
              tel_num:this.tel,
              uid:this.uidKudou,
              token:this.tokenKudou
            }).then(data=>{
              if(data.code==200){
                this.successCode = true;
                this.$message({
                  showClose: true,
                  message: data.msg,
                  duration: 1000,
                  type: "success"
                });
              }else if(data.code==403){
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
        bgAction(){
          if(this.phoneText()){
            this.$postKudou("/api/user/bindTelNum",{
              uid:this.uidKudou,
              token:this.tokenKudou,
              tel_num: this.tel,
              code:this.phonecode
            }).then(data=>{
              if(data.code==200){
                this.$message({
                  showClose: true,
                  message: data.msg,
                  duration: 1000,
                  type: "success"
                });
                this.$emit("bgShowFlase",false);
              }else if(data.code==403){
                this.initToken();
                this.bgAction();
              }else{
                this.$message.error(data.msg, {
                  duration: 1000,
                });
              }
            })
          }
        }
    },
    watch:{
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
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1000;
  background: #fff;
  border-radius: 4px;
}
.wrap .cont .title {
  position: relative;
  div{
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #515151;
    font-size: 16px;
  }
}
.wrap .cont .title .close{
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
  &:hover{
    color:#757575;
  }
}
.wrap .cont .input{
padding:0 15px 15px;
}
.wrap .cont .input .ground{
  width: 100%;
  border:1px solid #e5e5e5;
  margin-bottom: 15px;
  border-radius: 4px;
  position: relative;
}
.wrap .cont .input .ground input{
    background: transparent;
    border: none;
    height:34px;
    width: 100%;
   text-indent: 30px;
}
.wrap .cont .input .ground span{
    display: inline-block;
    cursor: pointer;
    height:34px;
    line-height: 34px;
    font-size: 14px;
    position: absolute;
    right: 14px;
    color: #FEAE09;
}
.wrap .cont .num{
  background: url("http://images.sooyooj.com/20190624/8MatyEcmxa9dBTdG.png") no-repeat 8px 8px;
  background-size:12px 18px;
}
.wrap .cont .yzm{
    display: flex;
    justify-content: space-between;
    background: url("http://images.sooyooj.com/20190624/84X0VUI9mvwvtO4c.png") no-repeat 8px 8px;
    background-size:12px 18px;
}
.wrap .cont .b{
  padding: 0 15px;
}
.wrap .cont .b .bd{
    width: 100%;
    background:#FEAE09;
    color: #fff;
    height: 42px;
    line-height: 42px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
}
.tips{ font-size: 12px; color:#F85555; text-align: center; height: 30px; line-height: 30px; padding-bottom: 16px; }
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
