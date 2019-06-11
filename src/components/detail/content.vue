<template>
<div>
  <div class="content board-box">
    <div class="ov commit">
      <div class="detailLeft fl" ref="detailLeft">
        <div class="detailLeft_top">
          <span>查看：<span class="highlight-color">{{detail.viewcount}}</span></span>
          <span class="pipe">|</span>
          <span>回复：<span class="highlight-color">{{detail.replycount}}</span></span>
        </div>
        <div class="detailLeft_content">
          <h3 class="author">{{detail.nickName}}</h3>
          <div class="avatar">
            <a href="javascript:;">
                <el-image
                  style="width: 130px; height: 130px"
                  :src="$IMG_URL+ detail.userImgUrl"
                  :fit="'contain'">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                 <!-- <img alt="头像" width="100%" height="100%" :src="$IMG_URL+detail.userImgUrl " style="display: inline;">  -->
            </a>
          </div>
          <ul class="otherinfo">
            <li>
              <label class="fl">组别</label>
              <span class="admin" >{{detail.vip?'管理员':"用户"}}</span>
            </li>
            <li>
              <label  class="fl">用户等级</label>
              <span>{{detail.userLvl}}</span>
            </li>
            <li>
              <label  class="fl">用户积分</label>
              <span>{{detail.userPoints}}</span>
            </li>
            <li>
              <label  class="fl">用户等级</label>
              <span>{{detail.userLvl}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="detailRight fr">
        <div class="detailRight_info">
            <div class="detailRight_info_title">{{detail.title}}</div>
            <div class="detailRight_info_content ov" ref="detailRight_info_content">
                <div class="pi">
                    <img src="@/assets/images/ico_lz.png" class="authincn vm">
                        <em>楼主 | 发表于 <span class="highlight-color">{{detail.ctime|dateTime}}</span></em>
                        <strong>楼主</strong>				
                </div>
                <div class="contentDetail" >
                    <p v-html="detail.content" ref="contentDetail"></p>
                </div>
            </div>
        </div>
        <div class="detailRight_site">    
            <a class="replayBtn" @click="addReplay(detail.id)">回复</a>
            <!-- <a class="editBtn" v-if="loginStatus">编辑</a> -->
            <p class="fr">
                <!-- <span>举报</span> -->
            </p>
        </div>
      </div>
    </div>
    <div class="ov commit replay" v-for="(item,index) in replyList" :key="index.id">
        <div class="detailLeft fl">
            <div class="detailLeft_content">
                <h3 class="author">{{item.nickname}}</h3>
                <div class="avatar">
                    <a href="">
                      <el-image
                        style="width: 130px; height: 130px"
                        :src="$IMG_URL+ item.userImgUrl"
                        :fit="'contain'">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </a>
                </div>
                <ul class="otherinfo">
                  <li>
                    <label class="fl">组别</label>
                    <span class="admin" >{{item.vip?'管理员':"游客"}}</span>
                  </li>
                  <li>
                    <label  class="fl">Vip等级</label>
                    <span>{{item.vipLvl}}</span>
                  </li>
                  <li>
                    <label  class="fl">用户积分</label>
                    <span>{{item.userPoints}}</span>
                  </li>
                  <li>
                    <label  class="fl">用户等级</label>
                    <span>{{item.userLvl}}</span>
                  </li>
                </ul>
            </div>
        </div>
        <div class="detailRight fr">
            <div class="detailRight_info">
                <div class="detailRight_info_content">
                    <div class="pi">
                      <img src="@/assets/images/ico_lz.png" class="authincn vm">
                        <em>{{item.nickname}} | 发表于 <span class="highlight-color">{{item.ctime|dateTime}}</span></em>
                        <strong>{{index+2}}楼</strong>				
                    </div>
                    <div class="contentDetail" >
                        <div class="quote" v-if="item.replyModel!=null">
                            <blockquote>
                               {{item.replyModel.nickname}} 表示于 {{detail.ctime|dateTime}}
                                <strong>楼层{{item.buildingno}}</strong>
                                <br>
                                <p v-html="item.content"></p>
                            </blockquote>
                            <p  class="replyContent" v-html="item.replyModel.content"></p>
                        </div>
                        <p v-html="item.content" v-else></p>
                    </div>  
                </div>
            </div>
            <div class="detailRight_site">
                <a class="replayBtn" @click="addReplayIndex(detail.id,item.cid,item.nickname,item.id,index+2,item.content,item.ctime)">回复</a>
                <!-- <a class="editBtn" v-if="loginStatus">编辑</a> -->
                <p class="fr" v-if="loginStatus">
                    <!-- <span>举报</span> -->
                    <i class="el-icon-delete" @click="delDis(item.id)">删除</i>
                </p>
            </div>
        </div>
    </div>
  </div>
   <div class="page">
       <editortwo
          :defaultMsg=defaultMsg
          :config=config
          ref='ue'
        >
        </editortwo>
        <el-row :gutter="20" class="page">
          <el-col :span="4">
            <el-button class="add" @click="reply(detail.id)" type="primary" size="medium">发表回复</el-button>
          </el-col>
          <el-col :span="16">
            <el-pagination
              @current-change="handleCurrentChange"
              background
              layout="prev,pager,next,jumper"
              :page-size="10"
              :total="count"
            ></el-pagination>
          </el-col>
        
        </el-row>
    </div>
   <show-reply :replyDialog="replyDialog" :topicid="topicid" @cancel="cancel" :replyContent="replyContent" :noShow="noShow" @getNewList="getNewList"></show-reply>
</div>
</template>
<script>
// import ueditor from '@/components/common/ueditor';
import editortwo from "@/components/common/ueditortwo"
import * as api from "@/api/detail"
import showReply from '@/components/common/showReply'
export default {
  name:"detail",
  data(){
    return {
      detail:[],
      defaultMsg:'',
      replyList:[],
      wrapperHeight:"",
      count:0,
      page:1,
      replyDialog:false,
      topicid:"",
      loginStatus:false,
      noShow:false,
      replyContent:{

      },
      config: {
        toolbars:[[
        'undo', 'redo', 'removeformat', 'formatmatch', '|',
        'paragraph',  'fontsize', '|',
        'bold', 'italic', 'underline','|',
        'insertorderedlist', 'insertunorderedlist','|', 
        'indent', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
        'simpleupload',  'horizontal','|'
        ]],
        'insertorderedlist':{
                decimal: "1,2,3...",
            "lower-alpha": "a,b,c...",
            "lower-roman": "i,ii,iii...",
            "upper-alpha": "A,B,C...",
            "upper-roman": "I,II,III..."
        },
        'insertunorderedlist':{
            circle: "○ 大圓圈",
            disc: "● 小黑點",
            square: "■ 小方塊 ",
            dash: "— 破折號"
        },
        'paragraph':{ 'h2':'标题 1', 'h3':'标题 2', 'h4':'标题 3', },
        'fontsize':[14, 16, 18, 20, 24]
      },
    }
  },
  components:{
    showReply,
    editortwo
  },
  methods:{
    getNewList(){
      this.replyDialog=false,
      console.log(this.$route.params.id)
      this.getDetailReply(this.$route.params.id)
    },
    cancel(val){
      this.replyDialog=val
    },
    reply(id){//发表回复
      if(this.loginStatus){
          let data = {
          topicid:id,
          content:this.$refs.ue.getUEContent()
        }  
        this.commonReply(data)
      }else{
        this.$router.push({path:'/login'}) 
      } 
    },
    async commonReply(data){
      await api.addReply(data).then(res=>{
        console.log(res)
        if(res.code == 0 ){
         this.defaultMsg = ''
         this.getDetailReply(this.$route.params.id)
        }
      })
    },
    goBack(){ //返回
        window.history.back(-1); 
    },
    handleCurrentChange(val){
      this.page=val
      this.getDetailReply(this.$route.params.id)
    },
    async delDis(id){ //删除回复
      await this.$confirm('确定要删除该楼层的回复么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deleteDis({id:id}).then(res=>{
            if(res.code == 0){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getDetailReply(this.$route.params.id)
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addReplay(id){
      if(this.loginStatus){
        this.noShow=false
        this.topicid=id
        this.replyDialog = true
      }else{
        this.$router.push({path:'/login'}) 
      }
    },
    addReplayIndex(topicid,replyuserid,replyusername,replyid,buildingno,content,ctime){
      this.replyContent={
        topicid:topicid,
        replyuserid:replyuserid,
        replyusername:replyusername,
        replyid:replyid,
        buildingno:buildingno,
        content:content,
        ctime:ctime
      }
      if(this.loginStatus){
        this.replyDialog = true
        this.noShow=true
      }else{
        this.$router.push({path:'/login'}) 
      }
    },
    async getDetail(id){
      await api.getDetail(id).then(res=>{
        const data = res.data
        if(res.code == 0 ) {
          this.detail = data
        }
      })
    },
    async getDetailReply(id){
      await api.getReplay({
        topicid:id,
        page:this.page
        }).then(res=>{
        const data = res.data
        console.log(res)
        if(res.code ==0 ) {
          this.replyList = data
          this.count = res.count
        }
      })
    },
    init(){
      let cookie = this.$getCookie('uInfo');
      let userInfo = JSON.parse(cookie);
      if (userInfo && userInfo.token) {
          this.loginStatus = true;
      } else {
          this.loginStatus = false;
      }
    },
    async updateCount (id){
      await api.updateCount(id).then(res=>{
        console.log(res)
      })
    }
  },
  mounted(){
    this.$nextTick(()=>{
      //console.log(window.getComputedStyle(this.$refs.detailLeft).height)
      this.wrapperHeight = this.$refs.detailLeft.clientHeight 
      //console.log(this.wrapperHeight)
    })
  },
  created(){
    this.updateCount(this.$route.params.id)
    this.init()
    this.getDetail(this.$route.params.id)
    this.getDetailReply(this.$route.params.id)
  }
}
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  margin: 0 auto 20px;
  padding: 0;
  width: 100%;
  .commit{
    position: relative;
  }
  .operation-wrap {
    clear: both;
    padding: 10px;
    position: relative;
    background: #F5F5F5;
    border: 1px solid #E5E5E5;
    border-bottom-width: 0;
  }
  .detailLeft {
    overflow: hidden;
    width: 180px;
    min-width: 180px;
    padding: 0 0 22px 0;
    //background: #E6E6E6;
    .detailLeft_top {
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      word-wrap: normal;
      padding: 14px 10px 10px 10px;
      color: #999;
      border-bottom: 4px solid #C3C3C3;
      font-size:14px;
    }
    .detailLeft_content {
      .author{
        overflow: hidden;
        height: 36px;
        line-height: 36px;
        border-bottom: 1px dashed #CDCDCD;
        font-weight: 700;
        padding-left: 20px;
      }
      .avatar{
        width: 120px;
        margin: 10px 20px;
        img{
          border: 5px solid #e6e6e6;
        }
      }
      .otherinfo{
        overflow: hidden;
        margin: 5px 10px 5px 20px;
        li{
          overflow: hidden;
          height: 24px;
          line-height: 24px;
          label{
            width: 80px;
          }
          .admin{
            color:#9933CC;
          }
        }
      }
    }
  }
  .detailRight {
    width:1019px;
    min-height: 355px;
    border-left: 1px solid #CDCDCD;
    .detailRight_info {
      margin-bottom:40px;
      .detailRight_info_title {
        border-bottom: 4px solid #E6E6E6;
        overflow: hidden;
        white-space: nowrap;
        word-wrap: normal;
        padding: 14px 10px 8px 20px;
        font-size: 16px;
        font-weight: bold;
      }
      .detailRight_info_content {
        padding: 0 20px;
        vertical-align: top;
        .pi {
          margin-bottom: 10px;
          overflow: hidden;
          height:36px;
          line-height: 36px;
          border-bottom: 1px dashed #E6E7E1;
          position: relative;
          img {
            width: 16px;
            margin-top: 4px;
            position: relative;
            top: 5px;
            margin-right: 10px;
          }
          strong{
            border: 1px solid #FFFFFF;
            float: right;
            font-weight: 400;
            margin-top: -6px;
            padding: 4px 6px;
          }
        }
        .contentDetail{
            line-height: 30px;
            .quote{
                overflow: hidden;
                margin: 10px 0;
                background: #F9F9F9 url(../../assets/images/icon_quote_s.gif) no-repeat 20px 6px;
                color: #666;
                padding: 10px 10px 10px 65px;
                zoom: 1;
                blockquote{
                    display: inline-block;
                    margin: 0;
                    padding: 0 65px 10px 0;
                    background: url(../../assets/images/icon_quote_e.gif) no-repeat 100% 100%;
                    line-height: 1.6;
                    zoom: 1;
                }
                strong{
                    font-weight: bold
                }
            }
        }
      }
    }
  }
}
.detailRight_site {
  position: absolute;
  bottom:1px;
  color: #999;
  border-top: 1px dashed #e6e7e1;
  line-height: 36px;
  height: 36px;
  margin: 0 20px;
  width: 972px;
  cursor: pointer;
  opacity: 0.2;
  a {
    padding: 0 20px 0 25px;
  }
  .replayBtn {
    background: url(../../assets/images/fastreply.gif) no-repeat 0 50%; 
  }
  .editBtn{
    background: url(../../assets/images/edit.gif) no-repeat 0 50%;
  }
  i {
    margin-left:20px;
  }
}
.detailRight_site:hover{
  color:#333;
  opacity: 1;
}
.replay{
  .detailLeft{
    border-top: 4px solid #c3c3c3;
  }
  .detailRight{
    min-height: 320px;
  }
  .detailRight_info{
  border-top: 4px solid #e6e6e6;
  }       
}
.page{
  margin-top:40px;
}
</style>
