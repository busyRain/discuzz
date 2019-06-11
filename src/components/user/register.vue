<template>
	<div class="bg-wrap" v-loading="loading" element-loading-text="正在提交注册信息~" element-loading-spinner="el-icon-loading"
	 element-loading-background="rgba(0, 0, 0, 0.6)">
		<div class="con-wrap">
			<div class="con-inner">
				<div class="left">
					<p class="title">会员注册</p>
					<ul class='tab'>
						<li class="cursor" @click='changeTab(1)' :class="tab == 1 ? 'active' : ''">
							通过短信注册
						</li>
						<li class="cursor" @click='changeTab(2)' :class="tab == 2 ? 'active' : ''">
							通过邮箱注册
						</li>
					</ul>
					<div class="tab1" v-if='tab == 1'>
						<el-form :model="formMobile" :rules="rulesMobile" ref="formMobile"  class="form-login">
							<el-form-item prop="userPhone">
								<div class="phone">
									<img src="@/assets/images/icon-phone.png" alt="">
									<input v-model="formMobile.userPhone" type="tel" maxlength="11" placeholder="请输入的你的手机号码" />
								</div>
							</el-form-item>
							<el-form-item prop="passWord">
								<div class="phone">
									<img class="password" src="@/assets/images/icon-lock.png" alt="">
									<input v-model="formMobile.passWord" type="password" placeholder="密码(6-20位字母与字母或符号组成)" />
								</div>
							</el-form-item>
							<el-form-item prop="surePassword">
								<div class="phone">
									<img class="password" src="@/assets/images/icon-lock.png" alt="">
									<input v-model="formMobile.surePassword" type="password" placeholder="请重复密码" />
								</div>
							</el-form-item>
							<el-form-item prop="vCode">
								<div class="phone code">
									<input class="code-input" v-model="formMobile.vCode" type="text" placeholder="输入验证码" />
									<div class="get-code cursor">
										<span @click="sendMobileMessage" v-text="formMobile.counter.text"></span>
									</div>
								</div>
							</el-form-item>
						</el-form>
					</div>
					<div class="tab1" v-if='tab == 2'>
						<el-form :model="formEmail" :rules="rulesEmail" ref="formEmail" class="form-login">
							<el-form-item prop="userEmail" inline-message="true">
								<div class="phone">
									<img src="@/assets/images/icon-phone.png" alt="">
									<input v-model="formEmail.userEmail" type="email" placeholder="请输入的你的邮箱" />
								</div>
							</el-form-item>
							<el-form-item prop="passWord" inline-message="true">
								<div class="phone">
									<img class="password" src="@/assets/images/icon-lock.png" alt="">
									<input v-model="formEmail.passWord" type="password" placeholder="密码(6-20位字母与字母或符号组成)" />
								</div>
							</el-form-item>
							<el-form-item prop="surePassword" inline-message="true">
								<div class="phone">
									<img class="password" src="@/assets/images/icon-lock.png" alt="">
									<input v-model="formEmail.surePassword" type="password" placeholder="请重复密码" />
								</div>
							</el-form-item>
							<el-form-item prop="vCode" inline-message="true">
								<div class="phone">
									<img class="email" src="@/assets/images/icon-email.png" alt="">
									<input v-model="formEmail.vCode" type="text" placeholder="输入邮箱验证码" />
								</div>
							</el-form-item>
						</el-form>
					</div>
					<div class="login-btn cursor" @click='register'>确认注册</div>
					<div class="already">已有账号？<span class="cursor" @click='$router.push("/login")'>马上登录</span></div>
				</div>

				<div class="right">
					<div class="other-login">
						<div class="left-line"></div>
						<div>其他登录方式</div>
						<div class="right-line"></div>
					</div>
					<div class="other-icon">
						<div class="qq cursor">
							<span class="iconfont icon-qq1"></span>
						</div>
						<div class="qq cursor">
							<span class="iconfont icon-weixin1"></span>
						</div>
						<div class="qq cursor">
							<span class="iconfont icon-weibo1"></span>
						</div>
					</div>
					<div class="qr"></div>
					<div class="ewm">扫码下载APP</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "login",
		data() {
			return {
				loading: false,
				checked: false,
				tab: 1,
				formMobile: {
					userPhone: "",
					passWord: "",
					surePassword: "",
					vCode: "",
					counter: {
						text: "发送手机验证码",
						seconds: 120,
						func: null
					},

				},
				formEmail: {
					userEmail: "",
					passWord: "",
					surePassword: "",
					vCode: "",
					counter: {
						text: "发送邮箱验证码",
						seconds: 120,
						func: null
					},
				},
				rulesMobile: {
					userPhone: [{
						validator: (rule, value, callback) => {
							if (!value) {
								return callback(new Error('请输入手机号'));
							} else if (!(/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9]|16[0-9])\d{8}$/.test(value))) {
								return callback(new Error('请输入正确的手机号'));
							}
							callback && callback();
						},
						trigger: 'blur'
					}],
					passWord: [{
						validator: (rule, value, callback) => {
							if (!value) {
								return callback(new Error('请输入密码'));
							} else if (value.length < 6 || value.length > 20) {
								callback(new Error('6-20位字母与字母或符号组成'));
							} else {
								if (value !== '') {
									this.$refs.formMobile.validateField('surePassword');
								}
							}
							callback && callback();
						},
						trigger: 'blur'
					}],
					surePassword: [{
						validator: (rule, value, callback) => {
							if (value === '') {
								callback(new Error('请再次输入密码'));
							} else if (value !== this.formMobile.passWord) {
								callback(new Error('两次输入密码不一致!'));
							} else {
								callback();
							}
						},
						trigger: 'blur'
					}],
					vCode: [{
						validator: (rule, value, callback) => {
							if (value === '') {
								callback(new Error('请短信验证码'));
							}
							callback && callback();
						},
						trigger: 'blur'
					}]
				},
				rulesEmail: {
					userEmail: [{
						validator: (rule, value, callback) => {
							if (!value) {
								return callback(new Error('请输入邮箱'));
							} else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value))) {
								return callback(new Error('请输入正确的邮箱'));
							}
							callback && callback();
						},
						trigger: 'blur'
					}],
					passWord: [{
						validator: (rule, value, callback) => {
							if (!value) {
								return callback(new Error('请输入密码'));
							} else if (value.length < 6 || value.length > 20) {
								callback(new Error('6-20位字母与字母或符号组成'));
							} else {
								if (value !== '') {
									this.$refs.formEmail.validateField('surePassword');
								}
							}
							callback && callback();
						},
						trigger: 'blur'
					}],
					surePassword: [{
						validator: (rule, value, callback) => {
							if (value === '') {
								callback(new Error('请再次输入密码'));
							} else if (value !== this.formEmail.passWord) {
								callback(new Error('两次输入密码不一致!'));
							} else {
								callback();
							}
						},
						trigger: 'blur'
					}],
					emailCode: [{
						validator: (rule, value, callback) => {
							if (value === '') {
								callback(new Error('请邮箱验证码'));
							}
							callback && callback();
						},
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			sendMobileMessage(){
				var that = this;
				if (that.formMobile.counter.seconds == 0 || that.formMobile.counter.seconds == 120) {
					that.$refs.formMobile.validateField("userPhone", function(err) {
						if (!err) {
							that.loading = true;
							//that.loading.msg = "正在发送手机验证码~";
							that.$post('users/sendPhoneVerificationCode', {
								userPhone: that.formMobile.userPhone
							}).then(respone => {
								if (respone.code == 0) {
									that.$alert("手机验证码发送成功", {
										confirmButtonText: '确定',
										callback: function(action) {
											that.loading= false;
											that.formMobile.counter.func = setInterval(function() {												
												if (that.formMobile.counter.seconds == 0) {													
													clearInterval(that.formMobile.counter.func);													
													that.formMobile.counter.text = "重新发送验证码";
													that.formMobile.counter.seconds = 120;
												}
												that.formMobile.counter.text = "重新发送验证码(" + that.formMobile.counter.seconds + ")";
												that.formMobile.counter.seconds--;
											}, 1000)
										}
									});
								}
							})
						}
					})
				}
			},
			onSuccess(type, respone) {
				var that = this;
				if (respone.code == 0) {
					// 注册成功
					let userInfo = {
						token: respone.data,
						loginName: type == 1 ? this.formMobile.userPhone : this.formEmail.userEmail,
					}
					that.$setCookie("uInfo", JSON.stringify(userInfo));
					that.$message({
						message: respone.msg,
						type: "success",
						duration: 3000,
						onClose() {
							that.$router.back();
						}
					});
				} else {
					that.loading = false;
					var _msg = "";
					if (respone.status == 200) {
						_msg = respone.msg;
					} else {
						_msg = respone.message;
					}
					that.$alert(_msg, {
						confirmButtonText: '确定'
					});
				}
			},
			register() {
				let that = this;
				if (this.tab == 1) {
					this.$refs.formMobile.validate((valid) => {
						if (valid) {
							that.loading = true;
							this.$post('/users/register/mobile', {
								userPhone: that.formMobile.userPhone,
								passWord: that.formMobile.passWord,
								vCode: that.formMobile.vCode,
							}).then(res => {
								that.onSuccess(1, res);
							})
						} else {
							return false;
						}
					});

				} else if (this.tab == 2) {
					this.$refs.formEmail.validate((valid) => {
						if (valid) {
							that.loading = true;
							this.$post('/users/register/email', {
								userEmail: that.formEmail.userEmail,
								passWord: that.formEmail.passWord,
								vCode: that.formEmail.vCode,
							}).then(res => {
								that.onSuccess(2, res);
							})
						} else {
							return false;
						}
					});
				}
			},
			changeTab(tabIndex) {
				this.tab = tabIndex;
				if (this.tab == 1) {
					this.formMobile.userPhone = "";
					this.formMobile.passWord = "";
					this.formMobile.surePassword = "";
					this.formMobile.vCode = "";
					setTimeout(() => {
						this.$refs.formMobile.resetFields();
					}, 10)
				} else {
					this.formEmail.userEmail = "";
					this.formEmail.passWord = "";
					this.formEmail.surePassword = "";
					this.formEmail.vCode = "";
					setTimeout(() => {
						this.$refs.formEmail.resetFields();
					}, 10)
				}
			}
		}
	}
</script>
<style scoped lang="scss"> 

	@media (max-height:768px) {
		.bg-wrap {
			padding: 6% 0;
		} 
	}

	@media (min-height:768px) and (max-height:799px) {
		.bg-wrap {
			position: absolute;
			bottom: 0;
			top:75px;
		}

		.con-wrap {
			bottom: 10%;
			position: absolute;
		}
	}

	@media (min-height:800px) {
		.bg-wrap {
			position: absolute;
			bottom: 0;
			top:75px;
		}

		.con-wrap {
			bottom: 100px;
			position: absolute;
		}
	}

	.bg-wrap {
		background: url(../../assets/images/footer-bg.png) no-repeat bottom center;
		width: 100%;
		min-height: 415px;
		background-size: 100%;

		.con-wrap {
			width: 100%;

			.con-inner {
				margin: 0 auto;
				width: 1400px;
				display: flex;
				justify-content: center;
				box-sizing: border-box;
				background: url(../../assets/images/block-bg.png) no-repeat center center;
				background-size: 100% 100%;
				padding: 20px 180px 50px 200px;

				.left {
					width: 50%;
					padding-right: 30px;
					position: relative;

					.title {
						font-size: 24px;
						color: #FFFFFF;
						font-weight: 600;
						text-align: center;
						padding: 18px 0 38px 0;
					}

					.tab {
						display: flex;
						justify-content: center;
						text-align: center;
						color: #fff;
						font-size: 16px;

						>li {
							border-bottom: 1px solid #fff;
							text-align: center;
							width: 230px;
							padding: 15px 0px;
						}

						.active {
							font-weight: 600;
							border-bottom: 2px solid #fff;
						}
					}

					.tab1 {
						padding-top: 35px;
						text-align: center;
					}

					.phone {
						width: 90%;
						height: 48px;
						background: rgba(255, 255, 255, .1);
						border: 1px solid rgba(255, 255, 255, 1);
						border-radius: 24px;
						padding: 9px 10px 9px 24px;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						margin: 0 auto 10px;

						&.code {
							justify-content: space-around;
						}

						>div {
							border-right: 1px solid #fff;

							img {
								width: 17px;
								height: 25px;
								margin-right: 17px;
							}

							.password {
								width: 19px;
								height: 22px;
							}

							.email {
								width: 19px;
								height: 15px;
							}
						}

						.get-code {
							border-right: none;
							border-left: 1px solid #fff;
							padding-left: 9px;
							font-size: 14px;
							color: #fff;
						}

						input {
							width: 95%;
							padding-left: 17px;
							background: rgba(255, 255, 255, 0);
							height: 100%;
							outline: none;
							border: 0;
							color: #fff;
							font-size: 16px;
						}

						.code-input {
							width: 200px;
						}

						.eye {
							padding-left: 20px;
						}
					}

					.phone:last-child {
						padding-bottom: 11px;
					}

					.login-btn {
						width: 90%;
						height: 48px;
						border-radius: 24px;
						background: #fff;
						color: #0077FF;
						font-size: 20px;
						line-height: 48px;
						text-align: center;
						margin: 35px auto 10px;
					}

					.already {
						text-align: center;
						color: #fff;
						font-size: 16px;
						line-height: 1.5;

						span {
							color: #FFC766;
						}
					}

					&:after {
						width: 1px;
						display: block;
						content: '';
						background: #fff;
						position: absolute;
						top: 30%;
						bottom: 20%;
						right: 0;
					}
				}

				.right {
					width: 50%;

					.other-login {
						text-align: center;
						font-size: 20px;
						color: #fff;
						margin: 118px 0 60px 0;
						display: flex;
						align-items: center;
						justify-content: center;

						.left-line {
							width: 150px;
							height: 1px;
							background: linear-gradient(-90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
						}

						.right-line {
							width: 150px;
							height: 1px;
							background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
						}
					}

					.other-icon {
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-bottom: 60px;

						.qq {
							margin-right: 50px;
							width: 56px;
							height: 56px;
							border-radius: 50%;
							background: rgba(255, 255, 255, 0);
							border: 1px solid #fff;
							text-align: center;
							line-height: 56px;
							box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.14);

							span {
								font-size: 36px;
							}
						}

						.qq:last-child {
							margin-right: 0;
						}
					}

					.qr {
						width: 120px;
						height: 120px;
						background: #fff;
						margin: 0 auto;
						margin-bottom: 15px;
						display: none;
					}

					.ewm {
						text-align: center;
						color: #fff;
						display: none;
						font-size: 16px;
					}
				}
			}
		}
	}

	input::-webkit-input-placeholder {
		color: #fff;
		font-size: 14px;
	}
</style>
