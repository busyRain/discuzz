<template>
  <div class="board-box">
    <div class="main">
      <ul class="post-list" >
        <li v-for="(item,index) in list" :key="index">
          <!--主题标题-->
          <div class="post-title cleardis">
            <router-link :to="{path:`/discuzz/disDetail/${item.id}`}" tag="a" target="_blank">{{item.title}}</router-link>
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
                style="width: 30px; height:30px"
                :src="$IMG_URL+ item.userImgUrl"
                :fit="'contain'">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <!-- <img :src="$IMG_URL+item.userImgUrl" style="display: inline;"> -->
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
      
      <!--普通贴子-->
      <!-- <ul class="post-list">
        <li>
          <div class="post-title cleardis">
            <font color="#0087e0">[</font>
            <font color="#0087e0">普通帖子</font>
            <font color="#0087e0">]</font>
            <router-link :to="{path:'/discuzz/disDetail/19'}" tag="a" target="_blank">测试标题</router-link>
          </div>
          <div class="info1 cleardis">
            sfsdfsdfsfsdfs
          </div>
          <div class="info2 cleardis">
            <span class="fr">最后发表 
              <i class="change-time highlight-color">36 秒前</i>  
            </span>
            <a href="javascript:;" class="usre-avatar fl" target="_blank">
              <img src="http://img.javaex.cn/72419aa803684ae59d1bfa28c67ee71d" style="display: inline;">
              <span class="author">admin</span>
            </a>
          </div>
            <div class="price">
              <strong>2</strong>浏览
              <strong>1</strong>回复
            </div>
        </li>
      </ul> -->
      <div class="page">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-button type="primary" @click="addBlock" size="mini">发表</el-button>
          </el-col>
          <el-col :span="16">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              layout="prev,pager,next,jumper"
              :page-size="limit"
              :total="count"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </div>
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
    props:['list','count'],
    data(){
      return {
        id:'',
        page:1,
        limit:10,
        orderbytype:1,
        isShowAdd:false,
        loginStatus:false,
        // count:0,
      }
    },
    components:{
      showAdd,
  
    },
    computed:{
      // ...mapGetters({
      //  blocklist:'disList'
      // }),
    },
    methods:{
      init(){
          let cookie = this.$getCookie('uInfo');
          let userInfo = JSON.parse(cookie);
          if (userInfo && userInfo.token) {
              this.loginStatus = true;
          } else {
              this.loginStatus = false;
          }
      },
      handleCurrentChange(val){
        console.log(val)
        this.$emit("getPage",val)
      },
      cancel(val){
        this.$store.dispatch("getIsShowAdd",val)
        this.$emit("getPage",1)
      },
      addBlock(){
        if(this.loginStatus){
          this.id=this.$route.params.id
          this.$store.dispatch("getIsShowAdd",true)
        }else{
          this.$router.push({path:'/login'}) 
        }
        
      }
    },
    mounted(){
      // console.log(this.blocklist)
    },
    created(){        
        this.init();
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
      border-bottom: 1px dashed #e5e5e5;
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
      .usre-avatar img{
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
}
</style>
