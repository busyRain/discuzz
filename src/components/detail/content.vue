<template>
<div>
  <div class="content board-box">
    <!-- <div class="operation-wrap">
        <el-button type="text" size="mini" @type="sitDiscuzz()">设为精华贴</el-button>
        <el-button type="text" size="mini">取消精华贴</el-button>
        <el-button type="text" size="mini">置顶主题</el-button>
        <el-button type="text" size="mini">取消置顶</el-button>
        <el-button type="text" size="mini">删除主题</el-button>
    </div> -->
    <div class="ov commit">
      <div class="detailLeft fl">
        <div class="detailLeft_top">
          <span>查看：<span class="highlight-color">{{detail.viewcount}}</span></span>
          <span class="pipe">|</span>
          <span>回复：<span class="highlight-color">{{detail.replycount}}</span></span>
        </div>
        <div class="detailLeft_content">
          <h3 class="author">{{detail.nickName}}</h3>
          <div class="avatar">
            <a href="">
                <img alt="头像" width="100%" height="100%" :src="detail.userImgUrl" style="display: inline;">
            </a>
          </div>
          <ul class="otherinfo">
            <li>
              <label class="fl">组别</label>
              <span class="admin">管理员</span>
            </li>
            <li>
              <label  class="fl">UID</label>
              <span>1</span>
            </li>
            <li>
              <label  class="fl">主题</label>
              <span>36</span>
            </li>
            <li>
              <label  class="fl">贴子</label>
              <span>118</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="detailRight fr">
        <div class="detailRight_info">
            <div class="detailRight_info_title">{{detail.title}}</div>
            <div class="detailRight_info_content ov">
                <div class="pi">
                    <img src="@/assets/images/ico_lz.png" class="authincn vm">
                        <em>楼主 | 发表于 <span class="highlight-color">{{detail.ctime|dateTime}}</span></em>
                        <strong>楼主</strong>				
                </div>
                <div class="contentDetail">
                    <p v-html="detail.content"></p>
                </div>
            </div>
        </div>
        <div class="detailRight_site">    
            <a class="replayBtn">回复</a>
            <a class="editBtn">编辑</a>
            <p class="fr">
                <span>举报</span>
            </p>
        </div>
      </div>
    </div>
    <div class="ov commit replay">
        <div class="detailLeft fl">
            <div class="detailLeft_content">
                <h3 class="author">admin</h3>
                <div class="avatar">
                    <a href="">
                        <img alt="头像" width="100%" height="100%" src="http://img.javaex.cn/72419aa803684ae59d1bfa28c67ee71d" style="display: inline;">
                    </a>
                </div>
                <ul class="otherinfo">
                    <li>
                        <label class="fl">组别</label>
                        <span class="admin">管理员</span>
                    </li>
                    <li>
                        <label  class="fl">等级</label>
                        <span>{{detail.vipLvl}}</span>
                    </li>
                    <li>
                        <label  class="fl">主题</label>
                        <span>36</span>
                    </li>
                    <li>
                        <label  class="fl">贴子</label>
                        <span>118</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="detailRight fr">
            <div class="detailRight_info">
                <div class="detailRight_info_content">
                    <div class="pi">
                        <img src="@/assets/images/ico_lz.png" class="authincn vm">
                            <em>楼主 | 发表于 <span class="highlight-color">5小时前</span></em>
                            <strong>楼主</strong>				
                    </div>
                    <div class="contentDetail">
                        <div class="quote">
                            <blockquote>
                                admin 表示于 2016-06-15 15:28:25
                                <strong>2楼</strong>
                                <br>
                                <p>回复内容回复内容</p>
                            </blockquote>
                        </div>

                        <p>sfdsdfsdfssfdsdfsdfs</p>
                    </div>  
                </div>
            </div>
            <div class="detailRight_site">
                <a class="replayBtn">回复</a>
                <a class="editBtn">编辑</a>
                <p class="fr">
                    <span>举报</span>
                    <i class="el-icon-delete"></i>删除
                </p>
            </div>
        </div>
    </div>
  </div>
  <div class="page">
    <el-button type="primary" @click="">发新贴</el-button>
    <el-button class="fr">返回列表</el-button>
    <!-- <el-pagination></el-pagination> -->
   </div>
</div>
</template>
<script>
import * as api from "@/api/detail"
export default {
  name:"detail",
  data(){
    return {
      detail:[]
    }
  },
  methods:{
    async getDetail(id){
      await api.getDetail(id).then(res=>{
        const data = res.data
        if(res.code == 0 ) {
          this.detail = data
        }
      })
    }
  },
  created(){
    this.getDetail(this.$route.params.id)
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
    background: #E6E6E6;
    border-right: 1px solid #CDCDCD;
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
          border: 5px solid #fff;
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
            width: 55px;
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
  .detailRight_info{
  border-top: 4px solid #e6e6e6;
  }       
}
</style>
