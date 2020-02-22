<template>
  <div class="myPersonal">
    <div class="kuTitle">
      <h2 class="titl">最近订单</h2>
      <div class="look" @click="lookAllOrder">查看全部订单金额 ></div>
    </div>
    <ul class="order" v-if="orderData.length>0">
      <li v-for="(item,index) in orderData" :key="index">
        <div class="leftKu">
          <img :src="item.icon" :alt="item.game_name">
          <div class="contText">
            <h3 class="subjectKu">{{item.game_name}}-{{item.game_label}}</h3>
            <div class="tipKu">
              <div v-for="(list,index) in item.game_area_cloth" :key="index">{{list}}</div>
            </div>
          </div>
        </div>
        <div class="rightKu">
          <div class="timeBox">
            <div>提交时间</div>
            <p>{{item.create_time}}</p>
          </div>
          <div class="status" v-if="item.status==0">用户没有订单</div>
          <div class="status" v-if="item.status==1">已通过</div>
          <div class="status" v-if="item.status==2">未通过</div>
          <div class="status" v-if="item.status==3">等待审核</div>
          <div class="status" v-if="item.status==4">未提交任务</div>
          <div class="status" v-if="item.status==5">已取消订单</div>
        </div>
      </li>
    </ul>
    <div class="noData" v-else>
      <img src="http://images.sooyooj.com/20190625/fMSleNUSub75DHEF.png">
    </div>
    <div class="kuTitle">
      <h2 class="titl">订单任务</h2>
      <div class="btns">
        <!--<div class="leftBtn"><img src="http://images.sooyooj.com/20190624/zhPEhJGvdVKvGOMr.png"></div>-->
        <!--<div class="rightBtn"><img src="http://images.sooyooj.com/20190624/0ncj8pYBnvcmDkTr.png"></div>-->
      </div>
    </div>
    <div class="hotTask">
      <div class="hotList" v-for="(item,index) in gameData" :key="index">
          <img :src="item.icon" :alt="item.game_name">
          <div class="contKu">
            <h3 class="subjectKu">{{item.game_name}}-{{item.game_label}}</h3>
            <div class="tipKu">
              <div>{{item.game_area_cloth[0]}}</div>
            </div>
            <div class="plan">预计收益: <span>{{item.anticipated_income}}</span>元</div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return{
        orderData:[],
        gameData:[]
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
      lookAllOrder(){
        this.$emit('manuAction',1)
      },
      initOrderData(){
        this.$getKudou("/api/game/getUserOrder",{uid:this.uidKudou,token:this.tokenKudou, page:1,listRows:3}).then(data=>{
          if(data.code==200){
            this.orderData = data.data[0];
          }else if(data.code==403){
            this.initToken();
            this.initOrderData()
          }
        })
      },
      initGameData(){
        this.$getKudou("/api/index/getGame",{ page:1,listRows:4}).then(data=>{
          if(data.code==200){
            this.gameData=data.data[0];
          }
        })
      }
    },
    created() {
    },
    mounted(){
      this.initGameData();
      if(this.uidKudou){
        this.initOrderData();
      }
    }
  }
</script>
<style scoped lang="scss">
  .myPersonal{
    background: #fff;
    .kuTitle{
      padding: 0 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      .titl{
        font-size: 18px;
        color: #616161;
        font-weight: normal;
      }
      .look{
        color:#2168D7;
        font-size:14px;
        cursor: pointer;
      }
      .btns{
        display: flex;
        >div{ cursor: pointer; border: 1px solid #333; width: 30px; height: 18px;border-radius: 6px; display: flex;justify-content: center; align-items: center;}
       img{ width: 6px; height: 8px;}
        .leftBtn{
          margin-right:5px;
        }
      }
    }
    ul.order{
      margin-bottom: 20px;
      li{
        border-top: 1px solid #F2F2F2;
        display: flex;
        justify-content: space-between;
        height: 127px;
        align-items: center;
        .leftKu{
          display: flex;
          padding-left: 25px;
          img{
            width: auto;
            height:85px;
            margin-right: 9px;
          }
          .contText{
            .subjectKu{font-size: 18px; color: #333; font-weight: normal;}
            .tipKu{
              display: flex;
              margin-top: 12px;
              >div{ text-indent: 10px; width:90px; height:28px;line-height: 28px; background: url("http://images.sooyooj.com/20190621/QYjnUbUdnuuUpZth.png") no-repeat; background-size: 100% 100%; margin-right: 12px; font-size: 14px; color:#989794;   }
            }
          }
        }
        .rightKu{
          display: flex;
          .timeBox{
            margin-right: 90px;
            text-align: center;
            font-size: 14px;
            p{color:#F63232; margin-top: 12px; }
          }
          .status{ width:167px;text-align: center; height: 50px; line-height: 50px; color:#BDBDBD; font-size: 14px; }

        }
      }
    }
    .hotTask{
      border-top: 1px solid #F2F2F2;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-bottom: 40px;
      .hotList{
        padding-left: 25px;box-sizing: border-box; margin-top: 20px; width: 50%; display: flex;align-items: center;
        img{ width: 180px; height: auto;margin-right: 14px;}
        .contKu{
          .subjectKu{font-size: 18px; color: #333; font-weight: normal;}
          .tipKu{
            margin-top: 12px;
            >div{ text-indent: 14px; width:110px; height:28px;line-height: 28px; background: url("http://images.sooyooj.com/20190621/QYjnUbUdnuuUpZth.png") no-repeat; background-size: 100% 100%; margin-right: 14px; font-size: 14px; color:#989794;   }
          }
          .plan{
            margin-top: 4px;
            font-size: 14px;
            span{ color:#F63232; font-size:28px;  }

          }
        }
      }
    }
  }
  .noData{
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{ width: 150px;}
  }

</style>
