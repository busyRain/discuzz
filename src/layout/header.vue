<template>
  <div class="header">
    <div class="inner ov">
      <router-link class="logo-wrapper fl cursor" to="/" tag="div">
			  <img src="@/assets/images/logo.png" alt>
			</router-link>
      <!-- <div class="default-nav fl cb"> -->
      <el-menu :default-active="$route.path" :router=true class="fl" mode="horizontal">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/discuzz">论坛</el-menu-item>
      </el-menu>
			<!-- </div> -->
      <div class="search fl ov">
				<el-input class="fl" prefix-icon="el-icon-search" placeholder="请输入您要搜索的关键字" v-model="keywords"></el-input>
			</div>
      <div class="user fr ov" v-if="islogin">
				<router-link to="" class="ov">
					<img src="@/assets/images/head_img.png" class="fl" alt="">
					<div class="fl">
						<h4 class="username">{{username}}</h4>
						<div class="userlevel">
							<img src="@/assets/images/level_8.png" alt="" class="inline">
							<span class="inline">经验：2328</span>
						</div>
					</div>
				</router-link>
				<router-link to=""><img src="@/assets/images/chat.png" alt="" class="icon"></router-link>
				<router-link to=""><img src="@/assets/images/friend.png" alt="" class="icon"></router-link>
				<router-link to=""><img src="@/assets/images/setting.png" alt="" class="icon"></router-link>
				<img @click='logout' src="@/assets/images/quit.png" alt="" class="icon cursor">
			</div>
      <div class="user fr ov" v-else>
        <router-link to='/login' tag="el-button" class="el-button--primary">登录</router-link>
				<router-link to="/register" tag="el-button">注册</router-link>
			</div>
    </div>
  </div>
</template>
<script>
export default {
  name:"headerTop",
  data(){
    return {
      islogin:false,
      keywords:"",
      uName:""
    }
  },
  methods:{
    logout(){
    },
    goPath(){
    }
  },
  mounted(){
    
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 75px;
  border-bottom: 1px solid #eaeaea;
  background-color: #fff;
  box-shadow: 0 2px 5px 0 hsla(0, 0%, 76.5%, 0.4);
  -webkit-box-shadow: 0 2px 5px 0 hsla(0, 0%, 76.5%, 0.4);
}

.logo-wrapper {
  margin-right: 20px;
  display: block;
  padding: 5px 0;
  img {
    height: 65px;
  }
}
.el-menu {
  height: 75px;
  border-bottom: 0;
  border-collapse: collapse;
}
.el-menu,
.search {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-menu--horizontal > .el-menu-item {
  height: 75px;
  line-height: 75px;
  font-size: 18px;
  color: #333;
  padding: 0;
  margin: 0 20px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 3px solid #409eff;
  color: #409eff;
}
.search {
  width: 30%;
  padding: 18px 30px;
}
.user {
  padding: 18px 0 18px;
}
</style>
