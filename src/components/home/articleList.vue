<template>
    <div class="list">
        <ul class="listConUl">
            <li class="board-box" v-for="(item,index) in sectionList " :key="index">
                <h2>{{item.name}}</h2>
                <ul class="listUl">
                    <li class="listLi" v-for="(childItem,childIndex) in item.childList" :key="childIndex">
                        <div class="board">
                            <div class="board-img">
                                <a href="" target="_blank">
                                  <el-image
                                    style="width: 80px; height:80px;float:left"
                                    :src="$IMG_URL+childItem.imgurl"
                                    :fit="'contain'"
                                  >
                                  </el-image>
                                    <!-- <img class="fl" src="http://img.javaex.cn/Fnol7Gy7_ztiulsQLGpJDSQUzshj"/> -->
                                </a>
                            </div>
                            <dl>
                                <dt>
                                    <router-link :to="{path:`discuzz/disList/${childItem.id}`}" tag="a" target="_blank" >{{childItem.name}}</router-link>
                                </dt>
                                <dd>
                                    <em>主题：{{childItem.topiccount}}</em>
                                    <span class="pipe">|</span>
                                    <em>贴数：{{childItem.commentcount}}</em>
                                </dd>
                                <dd>{{childItem.synopsis}}</dd>
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
  name:"sectionList",
  data() {
    return {
      sectionList:{},
      id:"",
      page:1,
      limit:10,
      orderbytype:1 
    }
  },
  methods: {
    async getSection () {
      await api.getSection().then(res=>{
        const { data} = res
        if(res.code == 0){
            this.sectionList = data
        }
      })
    },
   
  },
  created() {
    let id = this.$route.params.id
    this.getSection()
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

