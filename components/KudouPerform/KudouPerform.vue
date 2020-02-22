<template>
  <transition name="fade">
    <div class="wrap">
      <div class="cont">
        <div class="title">
          <div>完成任务</div>
          <span class="close"  @click="quie">x</span>
        </div>
        <div class="box">
          <div class="list">
            <div>请选择区服:</div>
            <div class="selectBox">
              <ul>
                <li :class="selectIndex==index?'activ':''" v-for="(item,index) in detailData.game_area_cloth" :key="index" @click="selectAction(index,item)">
                  <div class="yuan"><span></span></div>
                  <div>{{item}}</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="list">
            <div>请填写角色名:</div>
            <div class="inputBox"><input type="text" v-model="roleName"></div>
          </div>
          <div class="list">
            <div>请上传截图:</div>
            <div class="imgBox">
              <div class="updata">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :headers="headers"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
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
    props:{
      detailData:{
        type:Object,
        default:null
      }
    },
    data(){
      return{
        // selectData:[{name:"43区 热火朝天"},{name:"64区 热火朝天"},{name:"52区 热火朝天"}],
        selectIndex:0,
        imageUrl: '',
        areaCloth:"",
        roleName:"",
        fileUrl:"",
        data:{},
        headers:{"Content-Type": "multipart/form-data"}
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
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'|| 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }

        let formData = new FormData();
        formData.append("file",file);
        this.data=formData;

        return isJPG && isLt2M;
      },
      selectAction(index,name){
        this.selectIndex = index;
        this.areaCloth=name
      },
      quie(){
        this.$emit("perShowFlase",false);
      },
      fileObj(){
        if(this.roleName==""){
          this.$message({
            message: "请填写角色名",
            type: "error",
            duration:"1500"
          })
          return false
        }
        if (this.imageUrl =="") {
          this.$message({
            message: "请上传截图",
            type: "error",
            duration:"1500"
          })
          return false
        }
        return true

      },
      btnCommit(){
        if(this.fileObj()){
          this.data.append('uid',this.uidKudou)
          this.data.append('token',this.tokenKudou)
          this.data.append('area_cloth',this.areaCloth?this.areaCloth:this.detailData.game_area_cloth[0])
          this.data.append('role_name',this.roleName)
          this.data.append('game_id',this.detailData.id)


          const instance = this.$axios.create({
            withCredentials: true
          })
          instance({
            method: "post",
            url: "http://api.ikudou.com/api/game/fulfilTask",
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: false,
            data: this.data,
          })
            .then(su => {
              if (su.data.code == 200) {
                this.$emit("perShowFlase",false);
                this.$message.success("提交成功", {
                        duration: 1200,
                      });
              }else if(su.data.code == 403){
                this.initToken()
                this.btnCommit();
              } else  {
                this.$message.error(su.data.msg, {
                  duration: 1000,
                });
              }
            })


        }
      }
    },
    watch:{
      detailData(){
        if(this.detailData.game_area_cloth){
          this.areaCloth = this.detailData.game_area_cloth[0];
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
  .wrap .cont {
    width: 468px;
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
      color: #3E3E3E;
      font-size: 20px;
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
  .box{
    .list{
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      >div:nth-child(1){
        width: 120px;
        height: 22px;
        line-height: 22px;
        color:#343434;
        font-size: 16px;
        text-align: right;
        margin-right: 10px;
      }
      >div:nth-child(2){
        width: 200px;
      }
      .selectBox{
        ul{
          li{
            font-size: 16px;
            color:#898989;
            display: flex;
            align-items: center;
            margin-bottom: 4px;
            cursor: pointer;
            .yuan{
              width: 14px;
              height: 14px;
              border: 1px solid #EFEFEF;
              padding: 2px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              box-sizing: border-box;
              margin-right: 4px;
            }
          }
          li.activ{
            color:#FEAE09;
            height: 22px;
            display: flex;
            align-items: center;
            .yuan{
              border: 1px solid #FEAE09;
              span{
                width: 100%;
                height: 100%;
                display: inline-block;
                background: #FEAE09;
                border-radius: 50%;
              }
            }
          }
        }
      }
      .inputBox{
        input{
          display: block;
          width:194px;
          height: 43px;
          border: 1px solid #EFEFEF;
          text-indent: 12px;
          font-size: 16px;
        }
      }
      .imgBox {
        .updata{
          border: 1px solid #EFEFEF;
          width: 94px;
          height: 94px;
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 94px;
            height: 94px;
            line-height: 94px;
            text-align: center;
          }
          .avatar {
            width: 94px;
            height: 94px;
            display: block;
          }
        }
      }


    }


  }
  .btnBox{
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    cursor: pointer;
    div{
      width:268px;
      height: 42px;
      line-height: 42px;
      background: #FEAE09;
      color: #fff;
      font-size: 16px;
      border-radius: 6px;
      text-align: center;
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
