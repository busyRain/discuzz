<template>
<div>
    <div class="board-box">
        <div class="board-bg" ></div>
        <div class="team-desc clearfix">
            <div class="desc-left fl">
                <div class="circle-img fl">
                    <img class="board-icon" :src="$IMG_URL+blockTop.imgurl"/>
                    <el-popover
                        placement="right"
                        trigger="hover"
                        >
                        <ul class="sectionList">
                            <li  v-for="(item,index) in section" :key="index" class="listLi">
                                <label class="fl">{{item.name}}</label>
                                <div class="childUL" v-if="item.childList.length>0">
                                     <router-link  v-for="(childItem,childIndex) in item.childList" :key="childIndex" :to="{path:`/disList/${childItem.id}`}" tag="a" target="_blank" >{{childItem.name}}</router-link>
                                </div>
                            </li>
                        </ul>
                        <el-button class="join-circle" slot="reference" size="medium" round >版块切换</el-button>
                        <!-- <a href="javascrip:;" class="join-circle" slot="reference">版块切换</a> -->
                    </el-popover>
                </div>
                <div class="circle-name fl">
                    <div class="club-name">{{blockTop.name}}</div>
                    <div class="club-desc">{{blockTop.synopsis}}</div>
                    <div class="club-desc-line"></div>
                    <div class="club-fan">
                        <!-- <p class="fan-numb">
                            <span class="fan-text">级别</span>
                            <b>{{blockTop.level}}</b>
                        </p> -->
                        <p class="fan-numb">
                            <span class="fan-text">贴数</span>
                            <b>{{blockTop.topiccount}}</b>
                        </p>
                        <p class="fan-numb">
                            <span class="fan-text">今日</span>
                            <b>{{blockTop.todayTopiccount}}</b>
                        </p>
                    </div>
                </div>
            </div>
            <div class="desc-right fr">
                <el-button @click="openDialog" class="send-post" round size="medium">发新贴</el-button>
                <!-- <a href="javascript:;" @click="openDialog" class="send-post"></a> -->
            </div>
        </div>
         <!--版块切换-->
        <!-- <div class="master-header clear ov">
            <div class="master-intro clear">
                <h4 class="title clear">版块切换</h4>
                
            </div>
        </div> -->
        <div class="classify-list " style="margin-left:20px;">
            <div class="classify-item">
                <span class="classify-title">看贴：</span>
                <div class="classify-list-out">
                    <ul class="classify-ul">
                        <li :class="['classify-li',isessence == false ?'on':'']" @click="toggleTab(false)">
                            <a href="javascript:;" class="classify-letter">全部贴</a>
                        </li>
                        <li :class="['classify-li',isessence == true ?'on':'']" @click="toggleTab(true)">
                            <a href="javascript:;" class="classify-letter">精华贴</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="classify-item">
                <span class="classify-title">排序：</span>
                <div class="classify-list-out">
                    <ul class="classify-ul">
                        <li :class="['classify-li',orderbytype == 4?'on':'']" @click="toggleSort(4)">
                            <a href="javascript:;" class="classify-letter">回复时间</a>
                        </li>
                        <li :class="['classify-li',orderbytype == 3?'on':'']" @click="toggleSort(3)">
                            <a href="javascript:;" class="classify-letter">发布时间</a>
                        </li>
                        <li :class="['classify-li',orderbytype == 1?'on':'']" @click="toggleSort(1)">
                            <a href="javascript:;" class="classify-letter">浏览次数</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <block-list :list="blockList" @getPage="getPage" :count="count" :sectionid="blockTop.id"></block-list>
</div>
</template>
<script>
import * as api from "@/api/list"
import * as apiSec from '@/api/home'
import blockList from '@/components/disList/blockList'
import { mapGetters } from 'vuex';

export default {
    name:"displayBlock",
    components:{
      blockList,
    },
    data(){
        return{
            isessence:false,
            orderbytype:4,
            page:1,
            limit:80,
            sectionid:'',
            blockList:{},
            blockTop:{},
            count:0,
            //loginStatus:false,
            section:{}
        }
    },
    computed:{
        ...mapGetters({
            isShowAdd:'isShowAdd'
        }),
         islogin: {
        get:function (){
          return !!this.$store.state.token;
        },
        set:function(){
        }}
    },
    methods:{
        getPage(val){
            this.page=val
            this.getBlockList()
        },
        toggleTab(type){
            this.isessence = type
            this.page =1
            this.getBlockList()
        },  
        toggleSort(sort){
            this.orderbytype = sort 
            this.page =1
            this.getBlockList()
        },
        openDialog(){
            console.log(this.islogin)
           if(this.islogin){
                this.$store.dispatch("getIsShowAdd",true)
            }else{
                this.$message({
                    message:"用户未登录",
                    type:'error'
                })
                //this.$router.push({path:'/login'}) 
            }
            
        },
        async getBlockList(){
            await api.getBlockList({
                //id:this.id,
                page:this.page,
                limit:this.limit,
                orderbytype:this.orderbytype,
                isessence:this.isessence,
                sectionid:this.sectionid
            }).then(res=>{
                const { data } = res
                if(res.code == 0){
                    this.blockList = data
                    this.count = res.count
                  
                }
            })
        },
        async getBlockTop(id){
            console.log(id)
            await api.getBlockTop(id).then(res=>{
                const { data } = res
                if(res.code == 0 ){
                    this.blockTop = data
                    let list =[];
                    list.push({url:this.$route.path,name:this.blockTop.name})
                    sessionStorage.setItem('navList',JSON.stringify(list))
                    console.log(JSON.parse(sessionStorage.getItem('navList')))
                }
            })
        },
        init(){
            // let cookie = this.$getCookie('uInfo');
            // let userInfo = JSON.parse(cookie);
            // if (userInfo && userInfo.token) {
            //     this.loginStatus = true;
            // } else {
            //     this.loginStatus = false;
            // }
        },
        async getSection () {
            await apiSec.getSection().then(res=>{
                const { data} = res
                if(res.code == 0){
                    this.section = data
                }
            })
        },
    },
    mounted() {
        //this.init();
    },
    created(){
        sessionStorage.removeItem('navList')
        this.sectionid = this.$route.params.id
        this.getSection()
        this.getBlockList()
        this.getBlockTop(this.$route.params.id)
        //this.init();
    }
}
</script>
<style lang="scss" scoped>
.board-box{
    font-size:14px;
}
.board-bg{
    background: url('../../assets/images/bg.png') no-repeat;
    background-size: cover;
    width:100%;
    height: 150px;
    background-color: #fbfbfb;
    background-size: cover;
    background-position: center;
    border-bottom: 1px solid #f0f1f2;
}
.team-desc{
    height: 110px;
    .desc-left{
        width:75%;
        .circle-img{
            position: relative;
            margin-left:20px;
            width:100px;
            .board-icon{
                position: absolute;
                top: -50px;
                left: 0;
                width: 100px;
                height: 100px;
                border: 3px solid #fff;
                border-radius: 50%;
                background: #fff;
            }
            .join-circle{
                display: block;
                margin: 66px 0 0 10px;
                // width: 80px;
                // height: 28px;
                // border-radius: 5px;
                 color: #1C8CE9;
                 border: 1px solid #1C8CE9;
                // text-align: center;
                // font-size: 13px;
                // line-height: 28px;
                // cursor: pointer;
            }
        }
        .circle-name{
            overflow: hidden;
            margin: 12px 0 0 20px;
            width: 70%;
            text-overflow: ellipsis;
            white-space: nowrap;
            .club-name{
                overflow: hidden;
                width: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 16px;
                line-height: 22px;
            }
            .club-desc{
                overflow: hidden;
                margin-top: 2px;
                width: 100%;
                height: 17px;
                color: #a8abb3;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                line-height: 17px;
            }
            .club-desc-line{
                margin-top: 10px;
                width: 100%;
                height: 1px;
                background: #f0f1f2;
            }
            .club-fan{
                margin-top:10px;
                font-size:14px;
                .fan-numb{
                    display: inline-block;
                    margin-right:10px;
                    .fan-text{
                        margin-right: 7px;
                        color: #a8abb3;
                        font-size: 14px;
                    }
                    b{
                        color: #F26C4F;
                        font-weight: 600;
                    }
                }
            }
        }
    }
    .desc-right{
        width:20%;
        .send-post{
            float: right;
            display: block;
            margin: 41px auto 0;
            margin-right: 20px;
            /* width: 100px; */
            /* height: 38px; */
            border: 1px solid #1C8CE9;
            /* border-radius: 5px; */
            color: #1C8CE9;
            /* text-align: center; */
            /* font-size: 14px; */
            /* line-height: 36px; */
            /* cursor: pointer; */
        }
    }
}
.master-header {
    padding:5px 30px;
}
.master-intro {
    .title{
        margin: -5px 10px 0 0;
        height: auto;
        float: left;
        width: 80px;
        height: 28px;
        border-radius: 5px;
        color: #1C8CE9;
        border: 1px solid #1C8CE9;
        text-align: center;
        font-size: 13px;
        line-height: 28px;
    }
    .m-list{
        margin-top: 2px;
        margin-left: 20px;
        a{
            color: #369;
        }
    }
}
.classify-list{
    line-height: 1;
    margin-top: 10px;
    .classify-item{
        margin-bottom:10px;
    }
    .classify-title{
        padding: 7px 0;
        color: #999;
        min-width: 50px;
        display: inline-block;
        vertical-align: top;
        padding: 4px 0;
    }
    .classify-list-out{
        display: inline-block;
        width: calc(100% - 100px);
    }
    .classify-ul{
        height:100%;
    }
    .classify-li{
        margin-right: 5px;
        position: relative;
        display: inline-block;
        cursor: pointer;
        .classify-letter{
            padding:4px 8px;
            display: inline-block;
            border-radius: 2px
        }
    }
    .classify-li.on .classify-letter {
        background: #555;
        color:#fff;
    }
}
.sectionList {
    padding: 0 20px 20px;
    label {
        padding: 0 25px 14px 0;
        font-size: 14px;
        color: #999;
    }
    .listLi {
        padding-top: 14px;
        overflow: hidden;
    }
    .childUL {
        margin: 0 0 0 81px;
        border-bottom: dashed 1px #a3a1a1;
        padding-bottom: 15px;
        a{
            padding: 0 25px 14px 0;
           
        }
        a:hover{
             color:#1C8CE9;
        }
    }
}
</style>
