<template>
    <div class="list">
        <ul class="listConUl">
            <li class="board-box">
                <h2>游戏讨论</h2>
                <ul class="listUl">
                    <li class="listLi">
                        <div class="board">
                            <div class="board-img">
                                <a href="" target="_blank">
                                    <img class="fl" src="http://img.javaex.cn/Fnol7Gy7_ztiulsQLGpJDSQUzshj"/>
                                </a>
                            </div>
                            <dl>
                                <dt>
                                    <router-link :to="{path:`discuzz/disList/${id}`}" tag="a" target="_blank">综合讨论</router-link>
                                    </dt>
                                <dd>
                                    <em>主题：2</em>
                                    <span class="pipe">|</span>
                                    <em>贴数：2</em>
                                </dd>
                                <dd>新鲜资讯一手掌握！</dd>
                            </dl>
                        </div>
                    </li>
                    <li class="listLi">
                        <div class="board">
                            <div class="board-img">
                                <a href="" target="_blank">
                                    <img class="fl" src="http://img.javaex.cn/Fnol7Gy7_ztiulsQLGpJDSQUzshj"/>
                                </a>
                            </div>
                            <dl>
                                <dt><a href="">综合讨论</a></dt>
                                <dd>
                                    <em>主题：2</em>
                                    <span class="pipe">|</span>
                                    <em>贴数：2</em>
                                </dd>
                                <dd>新鲜资讯一手掌握！</dd>
                            </dl>
                        </div>
                    </li>
                    <li class="listLi">
                        <div class="board">
                            <div class="board-img">
                                <a href="" target="_blank">
                                    <img class="fl" src="http://img.javaex.cn/Fnol7Gy7_ztiulsQLGpJDSQUzshj"/>
                                </a>
                            </div>
                            <dl>
                                <dt><a href="">综合讨论</a></dt>
                                <dd>
                                    <em>主题：2</em>
                                    <span class="pipe">|</span>
                                    <em>贴数：2</em>
                                </dd>
                                <dd>新鲜资讯一手掌握！</dd>
                            </dl>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
import * as api from "@/api/home"
export default {
  name:"articleList",
  data() {
    return {
      list:{},
      id:"",
      page:1,
      limit:10,
      orderbytype:1 
    }
  },
  methods: {
    async getList () {
        // await api.getList({
        //     id:this.id,

        // }).then(res=>{
        //     const { data} = res
        //     if(res.code == 0){
        //         this.list = data
        //     }
        // })
    }
  },
  created() {
    let id = this.$route.params.id
    this.getList()
  }
};
</script>
<style lang="scss" scoped>
.list {
  .listConUl {
    h2 {
      font-weight: normal;
      line-height: 60px;
      padding-left: 20px;
      border-bottom: 1px solid #E5E5E5;
      font-size: 18px;
    }
    .listUl {
      .listLi {
        width:33%;
        float: left;
        .board {
          padding: 20px 20px 20px 30px;
          font: 14px/1.5 'Helvetica Neue',Arial,'Hiragino Sans GB','STHeiti','Microsoft Yahei','SimSun','WenQuanYi Micro Hei',sans-serif;
        }
        .board-img{
          img{
            width:80px;
            height: 80px;;
          }
        }
        dl{
          margin-left:80px;
          padding-left: 10px;
          dt{
            font-size: 22px;
            font-weight: 400;
          }
          dd{
            padding: 1px 0;
            color: #999999;
          }
          .pipe{
            margin: 0 5px;
            color: #ccc;
          }
        }
        dd,dd em,dd a{
          color:#999;
        }
      }
    }
  }
}
</style>

