<template>
	<div class="header-pane">
		<div class="header-inner">
			<div class="logo">
				<!-- <img src="@/assets/css/images/logo-mini.png"/> -->
			</div>
			<ul class="mini-menu">
				<li class="menu-item menu-user" v-show="isLogin">
					<a v-text="me.nickname"></a>
					<ul class="sub-menu-user">
						<li class="user-card">
							<a :href="domain + page.avatar" target="_blank"><img :src="me.imgurl ? me.imgurl : domain + defaultAvatar" alt="" /></a>
							<a :href="domain + page.profile" target="_blank"><h4 class="user-name" v-text="me.nickname"></h4></a>
							<div class="user-level">
								<span class="inline point">经验：{{ me.userpoints }}</span>
								<span class="inline lv">LV{{ me.userlvl }}</span>
							</div>
						</li>
						<li>
							<a :href="domain + page.security" target="_blank"><span>个人设置</span></a>
						</li>
						<li @click="doLogout"><span>安全退出</span></li>
					</ul>
				</li>
				<li class="menu-item menu-login" v-show="!isLogin"><a :href="domain + page.login">登录</a></li>
				<li class="menu-item" v-show="!isLogin"><a :href="domain + page.register">免费注册</a></li>
				<li class="menu-item"><a href="https://t.cn/AijMezQl" target="_blank">了解我们</a></li>
				<li class="menu-item"><a href="https://t.me/finleyXL" target="_blank">商务合作</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
import { Base64 } from 'js-base64';
import * as api from '@/api/login';
export default {
	data: function() {
		return {
			defaultAvatar: '/img/header/head_img.jpg',
			domain: '',
			page: {
				login: '/login',
				register: '/register',
				avatar: '/member/avatar',
				security: '/member/security',
				profile: '/member/profile'
			},
			usermenu: {
				display: 'none'
			}
		};
	},
	computed: {
		isLogin: function() {
			return !!this.$store.state.auth;
		},
		me: function() {
			var _me = null,
				that = this;
			if (this.isLogin && !this.$store.state.member) {
				this.$store.dispatch('Update', function() {
					_me = that.isLogin ? JSON.parse(Base64.decode(that.$store.state.member)) : '';
				});
			} else {
				_me = this.isLogin ? JSON.parse(Base64.decode(this.$store.state.member)) : '';
			}
			return _me;
		}
	},
	methods: {
		mouseOver() {
			this.usermenu = {
				display: 'block'
			};
		},
		mouseOut() {
			var that = this;
			setTimeout(function() {
				that.usermenu = {
					display: 'none'
				};
			}, 1000);
		},
		doLogout: function() {
			try {
				let that = this;
				if (this.isLogin) {
					const _loading = this.$loading({
						lock: true,
						text: '正在退出',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					api.logout().then(res => {
						if (res.code == 0) {
							that.$store.dispatch('Logout');
							setTimeout(function() {
								_loading.close();
								that.$message({
									message: '退出成功',
									type: 'success',
									duration: 500
								});
								that.$router.go(0);
							}, 2000);
						}
					});
				} else {
					that.$router.go(0);
				}
			} catch (e) {}
		}
	},
	mounted: function() {
		if (process.env.NODE_ENV == 'development') {
			this.domain = 'https://www.feileyuan.club';
			// this.domain = 'localhost';
		} else if (process.env.NODE_ENV == 'production') {
			this.domain = 'https://www.feileyuan.com';
		}
	}
};
</script>
