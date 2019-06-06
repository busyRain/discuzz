<template>
  <div class="detail">
    <el-breadcrumb separator="/" class="postnav">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-map-location"></i>
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <content-list></content-list>
  </div>
</template>
<script>
import contentList from '@/components/detail/content'
export default {
  name:"detail",
  components:{
    contentList
  },
  methods:{
    sitDiscuzz(){

    },
    getDetail(id){

    }
  },
  created(){
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

