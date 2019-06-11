<template>
  <div class="detail">
    <el-breadcrumb separator="/" class="postnav">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-map-location"></i>
        首页
      </el-breadcrumb-item>
      <span v-if="navList.length==2">
        <el-breadcrumb-item :to="{path:navList[0].url}">{{navList[0].name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:navList[1].url}">{{navList[1].name}}</el-breadcrumb-item>
      </span>
      <span v-else>
        <el-breadcrumb-item :to="{path:navList[0].url}">{{navList[0].name}}</el-breadcrumb-item>
      </span>
    </el-breadcrumb>
    <keep-alive>
    <content-list></content-list>
    </keep-alive>
  </div>
</template>
<script>
import * as api from "@/api/detail"
import contentList from '@/components/detail/content'
export default {
  name:"detail",
  components:{
    contentList
  },
  data(){
    return {
      navList:[],
      detail:{}
    }
  },
  methods:{
    sitDiscuzz(){
    },
    async getDetail(id){
      await api.getDetail(id).then(res=>{
        const data = res.data
        if(res.code == 0 ) {
          this.detail = data
         
          this.navList.push({url:this.$route.path,name:this.detail.title})
          //console.log(this.navList)
          //JSON.stringify(sessionStorage.setItem('navList'),this.navList)
        }
      })
    },
  },
  created(){
    if(sessionStorage.getItem('navList')){
      this.navList = JSON.parse(sessionStorage.getItem('navList'))
    }
    //this.navList = JSON.parse(sessionStorage.getItem('navList'))
    this.getDetail(this.$route.params.id) 
  }
}
</script>
<style lang="scss" scoped>
.detail {
  margin: 20px auto;
  font-size:14px;
  .postnav {
    height: 30px;
    line-height: 30px;
    color: #777;
    margin: 0 0 8px;
  }
  
}
</style>

