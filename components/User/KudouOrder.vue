<template>
  <div class="myOrder">
    <div v-if="allOrder">
      <div class="kuTitle">
        <h2 class="titl">全部订单</h2>
      </div>
      <div class="orderTable">
        <ul v-if="allOrderData.length>0">
          <li class="tableHeader">
            <div>时间</div>
            <div>订单详情</div>
            <div>预计金额</div>
            <div>兑换状态</div>
          </li>
          <li class="list" v-for="(item,index) in allOrderData" :key="index" @click="toDetailOrder(item.id)">
            <div class="tiem">{{item.update_time}}</div>
            <div class="detail">
              <img :src="item.icon" :alt="item.game_name">
              <div class="rightText">
                <h3>{{item.game_name}}-{{item.game_label}}</h3>
                <p>订单号：<span>{{item.order_num}}</span></p>
              </div>
            </div>
            <div class="money">{{item.anticipated_income}}</div>
            <div class="status" v-if="item.status==0">用户没有订单</div>
            <div class="status" v-if="item.status==1">已通过</div>
            <div class="status" v-if="item.status==2">未通过</div>
            <div class="status" v-if="item.status==3">等待审核</div>
            <div class="status" v-if="item.status==4">未提交任务</div>
            <div class="status" v-if="item.status==5">取消订单</div>
          </li>
        </ul>
        <div class="noData" v-else>
          <img src="http://images.sooyooj.com/20190625/fMSleNUSub75DHEF.png">
        </div>
      </div>
      <el-pagination background layout="prev, pager, next" prev-text="上一页" next-text="下一页" :total='allCount' :page-size='data.listRows' :current-page.sync="data.page" @current-change="handleCurrentChange" style="text-align: center">
      </el-pagination>
    </div>
    <div class="detailOrder" v-else>
      <div class="kuTitle">
        <h2 class="titl">订单详情</h2>
      </div>
      <div class="detailBox">
        <div class="detailKu">
          <div class="leftKu">
            <img :src="OrderDetails.small_icon" :alt="OrderDetails.game_name">
            <div>
              <p class="subKu">{{OrderDetails.game_name}}</p>
              <div class="gameAreaCloth">
                <div class="numKu" v-for="(item,index) in OrderDetails.game_area_cloth">{{item}}</div>
              </div>
            </div>
          </div>
          <div class="rightKu">
            <div class="cancelKu" v-if="OrderDetails.status==2||OrderDetails.status==3||OrderDetails.status==4" @click="cancelOrder(OrderDetails.id)">取消订单</div>
            <div class="finishKu" v-if="OrderDetails.status==0||OrderDetails.status==2||OrderDetails.status==3||OrderDetails.status==4 ||OrderDetails.status==5" @click="toFinish(OrderDetails.game_id)">前去完成</div>
            <div class="awardKu" v-if="OrderDetails.status==4" @click="getAward">领取奖励</div>
          </div>
        </div>
        <div class="detailLog">
          <div class="titKu">详情记录</div>
          <div class="itemKu">
            <div>{{OrderDetails.create_time}}</div>
            <div class="numberKu">{{OrderDetails.anticipated_income}}</div>
            <div>订单编号：{{OrderDetails.order_num}}</div>
          </div>
        </div>
        <div class="informTitle">
          <i></i>
          <span>活动须知</span>
        </div>
        <div class="textKu">{{OrderDetails.activity_guidelines}}</div>
      </div>
    </div>
    <kudou-perform v-show="performShow" @perShowFlase="perShowFlase" :detailData="OrderDetails" ></kudou-perform>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import KudouPerform from '~/components/KudouPerform/KudouPerform'
  export default {
    data(){
      return{
        performShow:false,
        allOrderData:[],
        allCount:-1,//总条数
        data:{
          page:1,//第一页
          listRows:8//每页8
        },
        allOrder:true,
        OrderDetails:{}

      }
    },
    computed:{
      ...mapGetters(["uidKudou","tokenKudou"])
    },
    components:{
      KudouPerform
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
      cancelOrder(orderId){
        this.$confirm('此操作将取消订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$postKudou("/api/game/cancelOrder",{order_id:orderId,uid:this.uidKudou,token:this.tokenKudou}).then(data=>{
            if(data.code==200){
              this.$message.success(data.msg, {
                duration: 1000,
              });
              this.allOrder=true;

            }else if(data.code==403){
              this.initToken();
              this.cancelOrder(orderId)
            } else {
              this.$message.error(data.msg, {
                duration: 1000,
              });
            }
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      },
      perShowFlase(val){
        this.performShow=val
      },
      getAward(){
        this.performShow = true;
      },
      toFinish(id){
        window.open('http://www.sooyooj.com/play.html?id='+id+'&uid='+this.uidKudou)
      },
      toDetailOrder(id){
        this.orderDetailsAction(id)
        this.allOrder = false;
      },
      handleCurrentChange(e){
        document.documentElement.scrollTop=0;
        this.data.page=e;
         this.initOrderData();
      },
      initOrderData(val){
        this.data.uid=this.uidKudou;
        this.data.token=this.tokenKudou;
        this.$getKudou("/api/game/getUserOrder",this.data).then(data=>{
          if(data.code==200){
            this.allOrderData = data.data[0];
            if(val){
              this.allCount = data.data.allCount;
            }
          }else if(data.code==403){
            this.initToken();
            this.initOrderData(val)
          }
        })
      },
      orderDetailsAction(id){
        this.$getKudou("/api/game/OrderDetails",{order_id:id,uid:this.uidKudou,token: this.tokenKudou}).then(data=>{
          if(data.code==200){
            this.OrderDetails = data.data;
          }else if(data.code==304){
            this.initToken();
            this.orderDetailsAction(id)
          }
        })
      }

    },
    created() {
      // this.initOrderData(true)
    },
    mounted(){
      this.initOrderData(true)
    }

  }
</script>
<style scoped lang="scss">
  .myOrder{
    .kuTitle{
      padding: 0 25px;
      display: flex;
      align-items: center;
      height: 70px;
      .titl{
        font-size: 18px;
        color: #616161;
        font-weight: normal;
      }
    }
    .orderTable{
      li{
        display: flex;
        align-items: center;
        padding: 0 25px;
        width: 100%;
        box-sizing: border-box;
      }
      li div:nth-child(1){
        width: 232px;
        padding-left: 20px;
      }
      li div:nth-child(2){
        flex: 1;
      }
      li div:nth-child(3){
        width: 131px;
        text-align: center;
      }
      li div:nth-child(4){
        width: 189px;
        text-align: center;
      }
      .tableHeader{
        color: #6F6F6F;
        background: #FBFBFB;
        height: 45px;
        font-size: 16px;
      }
      .list{
        cursor: pointer;
        color:#9C9C9C;
        font-size: 14px;
        height: 96px;
        border-bottom: 1px solid #F6F6F6;
        .detail{
          display: flex;
          align-items: center;
          img{ width: 120px; margin-right: 9px;}
          .rightText{
            h3{ font-weight: normal;height: 25px; line-height: 25px; font-size: 16px; }
            p{height: 25px; line-height: 25px;}
          }
        }
        .money{font-size:36px; color: #F63232; }
      }
    }
  }

  .detailOrder{
    padding-bottom: 128px;
    .detailBox{padding: 0 25px;}
    .detailKu{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;
      .leftKu{
        display: flex;
        align-items: center;
        img{width: 91px;height: 91px; margin-right: 20px;}
        .subKu{font-size:24px; color: #3E3E3E; }
        .gameAreaCloth{
          display: flex;
        }
        .numKu{
          width: 110px;
          height:29px;
          line-height: 29px;
          text-indent:14px;
          background: url("http://images.sooyooj.com/20190621/QYjnUbUdnuuUpZth.png") no-repeat;
          background-size: 100% 100%;
          font-size: 14px;
          color: #8A8989;
          margin-top: 12px;
          margin-right: 8px;
        }
      }
      .rightKu{
        display: flex;
        >div{
          width:98px;
          height:35px;
          line-height: 35px;
          text-align: center;
          border-radius: 35px;
          cursor: pointer;
        }
        .cancelKu{
          border: 1px solid #F63232;
          color: #F63232;
          margin-right: 18px;
        }
        .finishKu{
          border: 1px solid #91C2FC;
          color: #91C2FC;
          margin-right: 18px;
        }
        .awardKu{
          border: 1px solid #FFB419;
          color: #FFB419;
        }
      }
    }
    .detailLog{
      margin-top: 20px;
      position: relative;
      border-top: 1px solid #F2F2F2;
      border-bottom: 1px solid #F2F2F2;
      color: #A2A2A2;
      .titKu{
        position: absolute;
        background: #fff;
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        top: -10px;
        left: 0;
        padding-right:15px;
      }
      .itemKu{
        display: flex;
        height: 64px;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        .numberKu{font-size: 26px;color:#F63232; }
      }
    }
    .informTitle{
      display: flex;
      align-items: center;
      margin-top: 22px;
      i{ display: block; width: 4px; height:20px; background: #FEAE09; border-radius: 4px; margin-right: 8px; }
      span{color:#FEAE09; font-size:20px;  }
    }
    .textKu{line-height: 44px; color:#3D3D3D; font-size:14px; padding: 0 13px;  }

  }
  .noData{
    height: 447px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{ width: 227px;}
  }

</style>
