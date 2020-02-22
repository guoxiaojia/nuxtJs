<template>
  <div class="myOrder">
      <div class="kuTitle">
        <h2 class="titl">资产明细</h2>
      </div>
    <div v-if="asssetDetails.length>0">
      <div class="orderTable">
        <ul>
          <li class="tableHeader">
            <div>时间</div>
            <div>金币明细</div>
            <!--<div>剩余金额</div>-->
            <div>事件</div>
          </li>
          <li class="list" v-for="(item,index) in asssetDetails" :key="index">
            <div class="tiem">{{item.update_time}}</div>
            <div class="detail add" v-if="item.state==1">
              +{{item.sum}}
            </div>
            <div class="detail subtract" v-else>
              -{{item.sum}}
            </div>
            <!--<div class="money">20000</div>-->
            <div class="status">{{item.commit}}</div>
          </li>
        </ul>
      </div>
      <el-pagination background layout="prev, pager, next" prev-text="上一页" next-text="下一页" :total='allCount' :page-size='data.listRows' :current-page.sync="data.page" @current-change="handleCurrentChange" style="text-align: center">
      </el-pagination>
    </div>
    <div class="noData" v-else>
      <img src="http://images.sooyooj.com/20190625/fMSleNUSub75DHEF.png">
    </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return{
        assetsData:[{},{}],
        page:10,
        n:4,
        dq:1,
        asssetDetails:[],
        allCount:-1,
        data:{
          page:1,
          listRows:8
        }

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
      handleCurrentChange(e){
        document.documentElement.scrollTop=0;
        this.data.page=e;
        this.initAsssetDetails();
      },
      initAssset(val){
        this.data.uid=this.uidKudou;
        this.data.token=this.tokenKudou;
        this.$getKudou("/api/user/asssetDetails",this.data).then(data=>{
          if(data.code==200){
            this.asssetDetails = data.data[0];
            if(val){
              this.allCount = data.data.allCount;
            }
          }else if(data.code==403){
            this.initToken();
            this.initAssset()

          }
        })
      },

    },
    created() {
      // this.initAssset(true)
    },
    mounted(){
      this.initAssset(true)
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
        justify-content: space-between;
        >div{width: 25%;}
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
          font-size:34px; color: #F63232;
        }
        .subtract{
          color:#CACACA;
        }
        .money{font-size:34px; color: #F63232; }
      }
    }
  }
  .noData{
    height: 447px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{ width: 227px;}
  }

</style>
