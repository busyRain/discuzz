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
					  <img src="@/assets/images/head_img.png" class="fl" alt="">
          </div>
					<div class="user-info fl">
						<h4 class="user-name">{{uName}}</h4>
						<div class="user-level">
							<img src="@/assets/images/level_8.png" alt="" class="inline">
							<span class="inline">经验：2328</span>
						</div>
					</div>
				</router-link>
				<router-link to="" class="user-link"><img src="@/assets/images/chat.png" alt="" class="icon"></router-link>
				<router-link to="" class="user-link"><img src="@/assets/images/setting.png" alt="" class="icon"></router-link>
				<img @click='logout' src="@/assets/images/quit.png" alt="" class="icon cursor out">
			</div>
      <div class="user fr ov" v-else>
        <router-link to='/login' tag="el-button" class="el-button--primary">登录</router-link>
				<router-link to="/user/register" tag="el-button">注册</router-link>
			</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name:"headerTop",
  data(){
    return {
      // islogin:false,
      keywords:"",
      uName:"",
      currentMenu:"",
      styleTab:''
    }
  },
  computed:{
    ...mapGetters({
      islogin:'islogin'
    })
  },
  mounted(){
        this.setCurrentMenu()
    },
    updated(){
        this.setCurrentMenu()
    },
  methods:{
    search(e){
      
      var e = event || window.event || arguments.callee.caller.arguments[0];
				if (e && e.keyCode == 13) {
          window.open("http://www.feileyuan.com/#/search?keyword="+this.keywords)
				  //location.href="http://www.feileyuan.com/#/search?keyword="+this.keywords
				}
    },
    refresh() {
				this.$delCookie("uInfo");
        this.uName = "";
        this.$store.dispatch('getIsLogin',false)
				//this.islogin = false;
    },
    setCurrentMenu(){
        if(this.$route.path.indexOf('disDetail')>-1 || this.$route.path.indexOf('disList')>-1){
         
           this.styleTab='border-bottom: 3px solid #409eff;color: #409eff;'
        }
        console.log(this.$route.path)
        // console.log(this.currentMenu)
    },
    logout() {
      try {
        let that = this;
        if (that.uName) {
          that.$axios.post('/users/logout').then(res => {
            if (res.code == 0) {
              that.refresh();
              that.$message({
                message: '退出成功',
                type: "success",
                duration: 2000,
                onClose() {
                  that.$router.go(0);
                }
              });
            }
          })
        } else {
          that.$router.go(0);
        }
      } catch (e) {}
    },
   
  },
  mounted() {
    let userInfo = this.$getCookie('uInfo');
    if (userInfo) {
      let uInfo = JSON.parse(userInfo);
      this.uName = uInfo.loginName;
    }

    this.keywords = this.$route.query.keyword;
    userInfo ?  this.$store.dispatch('getIsLogin',true) : this.$store.dispatch('getIsLogin',false);
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
