<template>
  <transition name="fade">
    <div class="wrapWithdraw">
      <div class="cont">
        <div class="title">
          <div>金币兑换提现</div>
          <span class="close"  @click="quie">x</span>
        </div>
        <div class="box">
          <input type="text" v-model="sum" placeholder="请输入您需要提现的账户金额">
          <p class="titl">预计到账：</p>
          <div class="iconBox">
            <img src="http://images.sooyooj.com/20190717/Daei3ljKuoKPuQcq.png">
          </div>
          <input type="text" v-model="name" :disabled="disabled" placeholder="请输入您的真实姓名">
          <input type="text" v-model="idCard" :disabled="disabled" placeholder="请输入正确的身份证号码">
          <input type="text" v-model="alipayAccount" :disabled="disabled" placeholder="请输入正确您的支付宝账号">
          <div class="textBox">
            <p>*第一次绑定会下次提现就默认这个支付宝账号了喔～</p>
            <p>*需要换绑请联系客服</p>
          </div>
        </div>
        <div class="btnBox">
          <div @click="btnCommit">确定提交</div>
        </div>
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
        disabled:false,
        sum:"",
        name:"",
        idCard:"",
        alipayAccount:""
      }
    },
    computed:{
      ...mapGetters(["uidKudou","tokenKudou","userInfoKudou","indexDataKudou"])
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
        this.$emit("withdrawShowFlase",false);
      },
      bindAlipay(){
        let obj={
          uid:this.uidKudou,
          token:this.tokenKudou,
          IDcard:this.idCard,
          alipay_account:this.alipayAccount,
          name:this.name
        };
        this.$postKudou("/api/user/bindAlipay",obj).then(data=>{
          if(data.code==200){
            this.$message.success(data.msg,{
              duration: 1000,
            });
            this.disabled=true;
            this.$emit('initUserData')
          }else if(data.code==403){
            this.bindAlipay();
            this.initToken()
          } else {
            this.$message.error(data.msg, {
              duration: 1000,
            });
          }
        })
      },
      requestWithdrawal(){
        let obj={
          uid:this.uidKudou,
          token:this.tokenKudou,
          sum:this.sum
        };
        this.$postKudou("/api/user/requestWithdrawal",obj).then(data=>{
          if(data.code==200){
            this.$message.success(data.msg,{
              duration: 2000,
            })
            this.$emit('initUserData')
            this.$emit("withdrawShowFlase",false);
          }else {
            this.$message.error(data.msg, {
              duration: 1000,
            });
          }
        })
      },
      btnCommit(){
        if(this.sum==''){
          this.$message.error('请输入提现金额', {
            duration: 1000,
          });
          return
        }else if(this.name==''){
          this.$message.error('请输入真实姓名', {
            duration: 1000,
          });
          return
        } else if(this.idCard==''){
          this.$message.error('请输入身份证号码', {
            duration: 1000,
          });
          return
        }else if(this.alipayAccount==''){
          this.$message.error('请输入支付宝账号', {
            duration: 1000,
          });
          return
        }

        if(this.indexDataKudou.alipay_account){
          this.requestWithdrawal();
        }else {
          this.bindAlipay();
          this.requestWithdrawal();
        }

      }
    },
      mounted(){
          if(this.indexDataKudou.alipay_account){
              this.alipayAccount = this.indexDataKudou.alipay_account;
              this.name = this.indexDataKudou.name;
              this.idCard = this.indexDataKudou.IDcard;
              this.disabled=true;
          }
      }
  };
</script>

<style scoped lang="scss">
  .wrapWithdraw {
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1000;
    left: 0;
    right: 0;
    overflow-y: hidden;
  }
  .bg {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    background: rgba(000, 000, 000, 0.4);
  }
  .wrapWithdraw .cont {
    width: 392px;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 1000;
    background: #fff;
    border-radius: 4px;
  }
  .wrapWithdraw .cont .title {
    position: relative;
    div{
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: #3E3E3E;
      font-size: 20px;
    }
  }
  .wrapWithdraw .cont .title .close{
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
  .box{
    padding: 0 18px;
    input{
      display: block;
      width: 100%;
      height: 43px;
      line-height: 43px;
      border: 1px solid #EFEFEF;
      text-indent: 8px;
      margin-top: 15px;
    }
    .titl{
      margin-top: 13px;
      color: #343434;
      font-size:14px;
    }
    .iconBox{
      display: flex;
      justify-content: center;
      img{ width: 50px; height: 50px; margin: 12px 0;}
    }
    .textBox{
      p{
        font-size: 12px;
        color: #F63232;
        margin-top: 10px;
      }
      margin-bottom: 15px;
    }


  }
  .btnBox{
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    div{
      width:268px;
      height: 42px;
      line-height: 42px;
      background: #FEAE09;
      color: #fff;
      font-size: 16px;
      border-radius: 6px;
      text-align: center;
      cursor: pointer;
    }
  }


  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
