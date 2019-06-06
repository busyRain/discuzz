<template>
  <div class="board-box">
    <h2>友情链接</h2>
    <ul class="main friend">
      <li>
        <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
      </li>
      <li>
        <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
      </li>
    </ul>
  </div>
</template>
<script>
import * as api from '@/api/home';
export default {
  name:"friend",
  data(){
    return {
      friendList:{},
    };
  },
  methods: {
    async getFriend() {    
    }
  },
  created() {
    this.getFriend();
  }
};
</script>
<style lang="scss" scoped>
h2 {
  font-weight: normal;
  line-height: 60px;
  padding-left: 20px;
  border-bottom: 1px solid #e5e5e5;
  font-size: 18px;
}
.main li {
  margin: 0;
  text-align: left;
  padding: 20px;
  float: left;
}
</style>
