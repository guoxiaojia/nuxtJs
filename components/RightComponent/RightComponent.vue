<template>
    <div class="gameRight">
        <div class="gameTitle">
            <div class="titleL">
                <i></i>
                <p>单机排行攻略</p>
            </div>
            <div class="titleR">
                <span>人气排行</span>
            </div>
        </div>
        <div class="listBox">
            <div class="list" v-for="(item,index) in standAloneData" :key="index" @click="toDetails(item.id,item.game_type_id)">
                <i></i>
                <div class="labels">
                    {{item.article_describe}}
                </div>
            </div>
        </div>
        <div class="gameTitle">
            <div class="titleL">
                <i></i>
                <p>本周新游攻略</p>
            </div>
            <div class="titleR">
                <span>新游首看</span>
            </div>
        </div>
        <div class="imgLists">
            <div class="imgItem" v-for="(item,index) in newData" :key="index" @click="toDetails(item.id,item.game_type_id)">
                <img :src="item.article_icon">
                <div class="infoBox">
                    <span class="subject">{{item.article_title}}</span>
                    <div class="type">
                        类型:
                        <span>{{item.hasOneGameType.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                standAloneData:[],
                newData:[]
            }
        },
        methods:{
            toDetails(id,typeid){
                window.open('/strategydetail?id='+id+'&typeid='+typeid);
            },
            initGameArticle(){
                var parem={
                    page:1,
                    listRows:10,
                    article_type:0 //0所有 1游戏攻略 2单机排行 3手游排行 4，本周新
                };
                this.$getKudou('/api/index/getGameArticle',parem).then(data => {
                    if (data.code == 200) {
                        this.standAloneData=data.data[0][2];
                        this.newData=data.data[0][4];
                    }
                })
            },
        },
        created() {
            this.initGameArticle();
        }
    }
</script>

<style scoped lang="scss">
    .gameRight{
        width: 310px;
        background: #fff;
        border-radius: 4px;
        border-shadow: 1px 1px 2px rgba(163, 162, 159, 0.4);
        -webkit-box-shadow: 1px 1px 2px rgba(163, 162, 159, 0.4);
        .gameTitle{
            display: flex;
            justify-content: space-between;
            padding-top: 20px;
            .titleL{
                display: flex;
                align-items: center;
                i{
                    width: 3px;
                    height: 15px;
                    background:#EC5143;
                    margin-right: 12px;
                }
                p{
                    color: #EC5143;
                    font-size:20px;

                }
            }
            .titleR{
                width: 151px;
                text-align: right;
                border-bottom: 1px solid #F2F2F2;
                height: 26px;
                span{
                    font-size: 12px;
                    color: #FDA503;
                    display: inline-block;
                    height: 26px;
                    line-height: 26px;
                    border-bottom:1px solid #FDA503 ;
                    margin-right: 6px;
                }
            }

        }
        .listBox{
            padding: 12px 15px;
            .list{
                display: flex;
                align-items: center;
                cursor: pointer;
                height: 30px;
                i{
                    display: block;
                    width: 5px;
                    height: 5px;
                    background:#898989;
                    border-radius: 50%;
                    margin-right: 6px;
                }
                .labels{
                    flex: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #898989;
                    font-size: 14px;
                }
                &:hover{
                    i{ background:#FDA503;}
                    .labels{color: #FDA503;}
                }
            }

        }
        .imgLists{
            padding: 10px 18px;
            .imgItem{
                padding-top: 14px;
                cursor: pointer;
                img{width: 274px;}
                .infoBox{
                    display: flex;
                    height: 35px;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 14px;
                    .subject{
                        color: #3C3C3C;
                        font-weight: bold;
                        max-width: 70%;
                    }
                    .type{
                        color:#898989;

                    }

                }
            }
        }
    }
</style>