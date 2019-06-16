<template>
  <div class="header">
    <div class="inner ov">
      <router-link class="logo-wrapper fl cursor" to="/" tag="div">
			  <img src="@/assets/images/logo.png" alt>
			</router-link>
      <el-menu :default-active="$route.path" :router=true class="fl" mode="horizontal" :routePath="currentMenu">
        <a class="el-menu-item" href="http://www.feileyuan.com/" target="_blank">首页</a>
        <a class="el-menu-item" href="http://www.feileyuan.com/#/news" target="_blank">资讯</a>
        <el-menu-item index="/" ref="topic" :style="styleTab">论坛</el-menu-item>
        <a class="el-menu-item" href="http://www.feileyuan.com/#/topic" target="_blank">专题</a>
        <a class="el-menu-item" href="http://www.feileyuan.com/#/activity" target="_blank">活动</a>
      </el-menu>
      <div class="search fl ov">
				<el-input class="fl" prefix-icon="el-icon-search" placeholder="请输入您要搜索的关键字" v-model="keywords"  @keyup.enter.native="search"></el-input>
			</div>
      <div class="user fr ov" v-if="islogin">
				<router-link to="" class="ov user-link">
          <div class="user-avatar fl">
					  <img :src="users.imgurl" class="fl" alt="">
          </div>
					<div class="user-info fl">
						<h4 class="user-name" v-text="users.nickname"></h4>
						<div class="user-level">
							<span class="inline lv">LV{{ users.userlvl }}</span> 
							<span class="inline point">经验：{{ users.userpoints }}</span>
						</div>
					</div>
				</router-link>
				<router-link to="" class="user-link"><img src="@/assets/images/chat.png" alt="" class="icon"></router-link>
				<router-link to="" class="user-link"><img src="@/assets/images/setting.png" alt="" class="icon"></router-link>
				<img @click='logout' src="@/assets/images/quit.png" alt="" class="icon cursor out">
			</div>
      <div class="user fr ov" v-else>
        <!-- <a href="http://www.feileyuan.com/login" class="el-button--primary">登录</a> -->
        <el-button type="primary" @click="goPath('http://www.feileyuan.com/login')">登录</el-button>
        <el-button  @click="goPath('http://www.feileyuan.com/register')">注册</el-button>
        <!-- <router-link to='/login' tag="el-button" class="el-button--primary">登录</router-link>
				<router-link to="/user/register" tag="el-button">注册</router-link> -->
			</div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/login"
import { mapGetters } from 'vuex';
export default {
  name:"headerTop",
  data(){
    return {
      keywords:"",
      uName:"",
      currentMenu:"",
      styleTab:'',
      username:'',
      token:'',
      users:{}
    }
  },
  computed: {
			islogin: {
        get:function (){
         return !!this.$store.state.token;
			},
		  set:function(){
			}}	
		},
  updated(){
    this.setCurrentMenu()
  },
  methods:{
    goPath(url){
      window.open(url)
    },
    getName(c_name){
      if (document.cookie.length>0){
        let c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1){ 
          c_start=c_start + c_name.length+1 
          let c_end=document.cookie.indexOf(";",c_start)
          if (c_end==-1) c_end=document.cookie.length
          return Base64.decode(document.cookie.substring(c_start,c_end))
        } 
      }
      return ""
    },
    search(e){
      var e = event || window.event || arguments.callee.caller.arguments[0];
				if (e && e.keyCode == 13) {
          window.open("http://www.feileyuan.com/search?keyword="+this.keywords)
				  //location.href="http://www.feileyuan.com/#/search?keyword="+this.keywords
				}
    },
    async getUser(){
      await api.getUser().then(res=>{
        if(res.code ==0 ){
          this.users = res.data
        }
      })
    },
    // refresh() {
    //     this.uName = "";
    //     this.$store.dispatch('init',{username:'',token:''})
    //     this.islogin = false;
    // },
    setCurrentMenu(){
        if(this.$route.path.indexOf('disDetail')>-1 || this.$route.path.indexOf('disList')>-1){
           this.styleTab='border-bottom: 3px solid #409eff;color: #409eff;'
        }
        console.log(this.$route.path)
        // console.log(this.currentMenu)
    },
    async logout() {
      //try {
        let that = this;
        if (this.islogin) {
          const _loading = this.$loading({
            lock:true,
            text:'正在退出',
            spinner:'el-icon-loading',
            background:'rgba(0,0,0,0.7)'
          });
          await api.logout().then(res => {
            if (res.code == 0) {
              this.$store.dispatch('Logout')
              setTimeout(function() {
									_loading.close();
									that.$message({
										message: '退出成功',
										type: 'success',
										duration: 500
									});
								
								}, 2000);
             this.islogin = false
            }
          })
        } 
        //else {
      //     that.$router.go(0);
      //   }
      // } catch (e) {}
    },
   
  },
  mounted() {
    this.setCurrentMenu()
    this.keywords = this.$route.query.keyword;
  },
  created(){
    if (this.islogin) {
      this.getUser();
    }
      //if(localStorage.getItem("token")==''){
          // this.username = this.getName('username')
          // this.token = this.getName('token')
          // let auth =this.getName('auth')
          // console.log(this.username)
          // this.$store.dispatch('init',{username:this.username,token:this.token})
          // if(this.token){
          //   this.islogin = true
          //   this.getUser()
          // }
      //}
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
  width: 25%;
  padding: 18px 30px;
}
.user {
		padding: 16px 0 16px;
		.user-link {
			display: inline-block;
			line-height: 45px;
			float: left;
			>img{
				vertical-align: middle;
			}
		}
		.user-avatar {
			border-radius: 100%;
			border: solid 3px #0077ff;
			height: 45px;
			width: 45px;
			overflow: hidden;
			box-sizing: border-box;

			>img {
				width: 100%;
				height: 100%;
			}

			~.user-info {
				margin-left: 10px;
				line-height: 1.5;
			}
		}

		.user-info {
			.user-name {
				color: #409EFF;
				margin-bottom: 5px;
			}

			.user-level>* {
				vertical-align: top;
				display: inline-block;
				font-size: 12px;
				line-height: 15px;
			}
      .user-level {
				.lv {
					color: #f57f0c;
					margin-right: 10px;
				}

				.point {}
			}
		}
	}
  .icon {
    display: inline-block;
    margin-left: 20px;
}
.out{
  margin-top:10px;
}
</style>
