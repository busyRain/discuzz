<template>
	<div class="loginBlock">
		<el-dialog :visible.sync="loginVisible" :before-close="cancel" :close-on-click-modal="false">
			<div class="loginbg">
				<div class="form-header">
					<div class="title">会员登录</div>
					<div class="sub-title">
						<span>Welcome to</span>&nbsp;
						<span>Fei Le Yuan.</span>
					</div>
				</div>
			</div>
			<div class="wrapper-form-inner">
				<el-form :model="loginForm" :rules="rules" ref="loginForm" class="form-login">
					<el-form-item prop="userName">
						<el-input type="type" v-model="loginForm.userName" placeholder="请输入登录手机号码或邮箱">
							<template slot="append">
								<i class="el-icon-user"></i>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="passWord">
						<el-input type="password" v-model="loginForm.passWord" placeholder="6-20位字母与字母或符号组成">
							<template slot="append">
								<i class="el-icon-lock"></i>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click='login'>登录</el-button>
					</el-form-item>
					<el-form-item>
						<el-button @click='register'>免费注册</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		<register-block :registerVisible="registerVisible" @cancelRegister="cancelRegister" @goLogin="goLogin"></register-block>
	</div>
</template>
<script>
	import * as api from '@/api/login';
	import registerBlock from "@/components/common/register"
	export default {
		name: "login",
		components: {
			registerBlock
		},
		data() {
			var checkUserName = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入登录手机号或邮箱'));
				}
				callback && callback();
			};
			var validatePassWord = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if (value.length < 6 || value.length > 20) {
					callback(new Error('6-20位字母与字母或符号组成'));
				}
				callback && callback();
			};
			return {
				loading: {
					status: false,
					inst: null,
					text: "正在验证登录信息~"
				},
				loginForm: {
					userName: '',
					passWord: '',
					checked: false
				},
				rules: {
					userName: [{
						validator: checkUserName,
						trigger: 'blur'
					}],
					passWord: [{
						validator: validatePassWord,
						trigger: 'blur'
					}]
				},
				registerVisible: false,
			};
		},
		props: ['loginVisible'],
		methods: {
			goLogin(data) {
				this.$emit('cancel', true)
			},
			cancelRegister(data) {
				this.registerVisible = data
			},
			register() {
				this.$emit('cancel', false)
				this.registerVisible = true
			},
			login() {
				let that = this;
				this.$refs.loginForm.validate((valid) => {
					if (valid) {
						that.loading.status = true;
						api.userlogin({
							loginName: that.loginForm.userName,
							passWord: that.loginForm.passWord
						}).then(res => {
							that.loading.status = false;
							if (res.code == 0) {
								that.$store.dispatch("LoginDia", {
									token: res.data,
									username: that.loginForm.userName,
								});
								that.$store.dispatch('getUser');
								that.$emit('cancel', false);

							} else {
								that.loading.inst.close();
								var _msg = "";
								_msg = res.msg ? res.msg : res.message;
								that.$alert(_msg, {
									confirmButtonText: '确定'
								});
							}
						}, function(err) {
							that.loading.status = false;
							that.loading.inst.close();
							that.$alert("登录失败（请求异常）", {
								confirmButtonText: '确定'
							});
						})
					} else {
						return false;
					}
				})
			},
			cancel() {
				this.$emit('cancel', false)
			},

		},
		mounted: function() {
			//this.$store.dispatch("Logout");
		}

	}
</script>
