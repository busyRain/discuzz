<template>
  <div class="board-box" ref="boardBox">
    <div class="main">
      <ul class="post-list" >
        <li v-for="(item,index) in list" :key="index">
          <!--主题标题-->
          <div class="post-title cleardis">
            <router-link :to="{path:`/disDetail/${item.id}`,query:{sectionid:sectionid}}" tag="a" target="_blank">{{item.title}}</router-link>
            <span class="uscat_pt" v-if="item.isrecommend">
              置顶
            </span>
            <span class="uscat_pt" v-if="item.isessence">
              精
            </span>
          </div>
          <!-- <div class="info1 cleardis">
            {{item.signTxt}}
          </div> -->
          <div class="info2 cleardis">
            <span class="fr">
              发布于 
              <i class="change-time">{{$formatDate(item.ctime,"yyyy-MM-dd hh:mm:ss")}}</i>
            </span>
            <a href="javascript:;" class="usre-avatar fl" target="_blank">
              <el-image
                style="width: 30px; 
                height:30px;
                border-radius: 50%;
                margin-right: 10px;
                cursor: pointer;"
                :src="$IMG_URL+ item.userImgUrl"
                :fit="'contain'">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
                <span class="author">{{item.nickName}}</span>
            </a>
          </div>
          <div class="price">
            <strong>{{item.viewcount}}</strong>浏览
            <strong>{{item.replycount}}</strong>回复
          </div>
        </li>
        <!-- <div class="bankuai" >版块主题</div> -->
      </ul>
      <div class="page">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-button type="primary" @click="addBlock" size="mini">发表</el-button>
          </el-col>
          <el-col :span="16">
            <el-pagination  v-if="count!=0"
              background
              @current-change="handleCurrentChange"
              layout="prev,pager,next,jumper"
              :page-size="limit"
              :total="count"
            >
            </el-pagination>
            <div v-else class="noDate">暂无数据</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="scroll-top-btn">
      <ul>
        <li @click="goTop">
            <span class="iconbtn"><i class="el-icon-arrow-up"></i></span>
            <span>top</span>

        </li>
        <li @click="addBlock">
          <em>快速</em>
          <em>发贴</em>
        </li>
      </ul>
    </div>
    <show-add :show="isShowAdd" :id="id" @cancel="cancel"></show-add>
  </div>
</template>
<script>
import * as api from "@/api/list"
import { mapGetters, mapActions } from 'vuex'
import showAdd from "@/components/common/showAdd"

export default {
    name:"blockList",
    props:['list','count','sectionid'],
    data(){
      return {
        id:'',
        page:1,
        limit:80,
        orderbytype:1,
        isShowAdd:false,
        //loginStatus:false,
        // count:0,
      }
    },
    components:{
      showAdd,
  
    },
    computed:{
      islogin: {
        get:function (){
          return !!this.$store.state.token;
        },
        set:function(){
        }}

    },
    methods:{
      goTop(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      init(){
          // if (this.islogin) {
          //     this.loginStatus = true;
          // } else {
          //     this.loginStatus = false;
          // }
      },
      handleCurrentChange(val){
        console.log(val)
        document.body.scrollTop = document.documentElement.scrollTop = 0;
       
        this.$emit("getPage",val)
      },
      cancel(val){
        this.$store.dispatch("getIsShowAdd",val)
        this.$emit("getPage",1)
      },
      addBlock(){
        if(this.islogin){
          this.id=this.$route.params.id
          this.$store.dispatch("getIsShowAdd",true)
          this.$refs.boardBox.scrollTop = 0
         // document.body.scrollTop = document.documentElement.scrollTop = 0;
        }else{
          this.$message({
            message:"用户未登录",
            type:'error'
          })
        }
        
      }
    },
    mounted(){
      // console.log(this.blocklist)
    },
    created(){        
        //this.init();
    }
}
</script>

<style lang="scss" scoped>
.main {
  margin-top:-20px;
  margin: 0;
  text-align: left;
  padding: 20px;
  ul.post-list{
    >li{
      padding: 18px 0 0;
      border-bottom: 1px dashed #c3c3c3;
      position: relative;
      margin-top: 10px;
      padding-bottom: 10px;
    }
    li{
      .post-title{
        font-size: 18px;
        padding-bottom: 12px;
        display: block;
        color: #666;
        width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        a{
            color:#222;
        }
        .uscat_pt{
          color: #fff;
          background: #1C8CE9;
          font-size: 12px;
          padding: 4px 3px;
          display: inline-block;
          border-radius: 3px;
          margin-left: 10px;
        }
      }
      >.info2{
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #666;
        position: relative;
        .author{
          position: absolute;
        }
      }
      .usre-avatar .el-image__inner{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
        cursor: pointer;
      }
      >.price{
        position: absolute;
        right: 10px;
        top: 20px;
        color: #999;
        strong{
          color: #f6a11e;
          font-size: 18px;
          font-weight: 400;
          margin-left: 10px;
          margin-right: 5px;
          font-style: italic;
        }
      }
      >.info1{
        padding-bottom: 10px;
        color: #666;
        width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .bankuai{
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    background: #fefefe;
    border-color: #eee;
    border-bottom: 1px solid #eee;
  }
  .page{
    margin-top:20px;
  }
  .noDate{
    text-align: center;
    color:#999;
  }
}
.scroll-top-btn{
  position: fixed;
  bottom: 100px;
  width: 40px;
  z-index: 99;
  margin-left: 1210px;
  li{
    width: 45px;
    height: 50px;
    background: #737070;
    color: #fff;
    text-align: center;
    cursor: pointer;
    line-height: 50px;
    position: relative;
    margin-bottom:10px;
    display: block;
    span{
      display: block;
      height: 8px;
    }
    .iconbtn{
     top: -10px;
      position: relative;
    }
    em{
      display: block;
      height: 20px;
      position: relative;
      top: -10px;
    }
  }
}
</style>
