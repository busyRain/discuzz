<template>
  <div class="board-box">
    <div class="main">
      <ul class="post-list">
        <li>
          <!--主题标题-->
          <div class="post-title cleardis">
            <router-link :to="{path:'/discuzz/disDetail/19'}" tag="a" target="_blank">测试置顶</router-link>
            <span class="uscat_pt">
              置顶
            </span>
            <span class="uscat_pt">
              精
            </span>
          </div>
          <div class="info2 cleardis">
            <span class="fr">
              发布于 
              <i class="change-time">2019-05-06 21:43:39</i>
            </span>
            <a href="javascript:;" class="usre-avatar fl" target="_blank">
              <img src="http://img.javaex.cn/72419aa803684ae59d1bfa28c67ee71d" style="display: inline;">
                <span class="author">admin</span>
            </a>
          </div>
          <div class="price">
            <strong>17</strong>浏览
            <strong>1</strong>回复
          </div>
        </li>
      </ul>
      <div class="bankuai">版块主题</div>
      <!--普通贴子-->
      <ul class="post-list">
        <li>
          <!--主题标题-->
          <div class="post-title cleardis">
            <font color="#0087e0">[</font>
            <font color="#0087e0">普通帖子</font>
            <font color="#0087e0">]</font>
            <router-link :to="{path:'/discuzz/disDetail/19'}" tag="a" target="_blank">测试标题</router-link>
          </div>
          <!-- 主题摘要 -->
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
      </ul>
      <div class="page">
        <el-button type="primary">发表</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/list"
export default {
    name:"blockList",
    data(){
        return {
            id:"",
            page:1,
            limit:10,
            orderbytype:1,
            blockList:{}

        }
    },
    methods:{
        async getBlockList(){
            // await api.getBlockList({
            //     id:this.id,
            //     page:1,
            //     limit:10,
            //     orderbytype:1
            // }).then(res=>{
            //     const { data } =res
            //     if(res.code == 0){
            //         this.blockList = data
            //     }
            // })
        }
    },
    created(){
        let id = this.$route.params.id
        this.getBlockList()
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
