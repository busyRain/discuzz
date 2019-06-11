<template>
	<div class="bg-wrap" v-loading="loading.status" :element-loading-text="loading.msg" element-loading-spinner="el-icon-loading"
	 element-loading-background="rgba(0, 0, 0, 0.6)">
		<div class="con-wrap">
			<div class="con-inner">
				<h1>找回密码</h1>
				<ul class='tab'>
					<li class="cursor" @click='changeTab(1)' :class="tab == 1 ? 'active' : ''">通过短信找回</li>
					<li class="cursor" @click='changeTab(2)' :class="tab == 2 ? 'active' : ''">通过邮箱找回</li>
				</ul>
				<div class="tab1" v-if='tab == 1'>
					<p>请输入注册时绑定的手机号码，我们会马上把确认短信发送给您</p>
					<el-form :model="formMobile" :rules="rulesMobile" ref="formMobile">
						<el-form-item prop="userPhone">
							<div class="input-wrap input-key">
								<input v-model="formMobile.userPhone" type="tel" maxlength="11" placeholder="请填写手机号码" />
								<div class="btn cursor" @click="sendMobileMessage" v-text="formMobile.counter.text"></div>
							</div>
						</el-form-item>
						<el-form-item prop="vCode">
							<div class="input-wrap">
								<input type="text" v-model='formMobile.vCode' placeholder="请填写手机验证码" />
							</div>
						</el-form-item>
						<el-form-item prop="passWord">
							<div class="input-wrap">
								<input v-model="formMobile.passWord" type="password" placeholder="请填写新密码(6-20位字母与字母或符号组成)" />
							</div>
						</el-form-item>
						<el-form-item prop="surePassword">
							<div class="input-wrap">
								<input v-model="formMobile.surePassword" type="password" placeholder="请重复新密码" />
							</div>
						</el-form-item>
					</el-form>
				</div>
				<div class="tab1" v-if='tab == 2'>
					<p>请输入注册时绑定的邮箱，我们会马上把确认短信发送给您</p>
					<el-form :model="formEmail" :rules="rulesEmail" ref="formEmail">
						<el-form-item prop="userEmail">
							<div class="input-wrap input-key">
								<input type="email" v-model='formEmail.userEmail' placeholder="请填写邮箱验" />
								<div class="btn cursor" @click="sendEmailMessage" v-text="formEmail.counter.text"></div>
							</div>
						</el-form-item>
						<el-form-item prop="emailCode">
							<div class="input-wrap">
								<input type="text" v-model='formEmail.emailCode' placeholder="请填写邮箱验验证码" />
							</div>
						</el-form-item>
						<el-form-item prop="passWord">
							<div class="input-wrap">
								<input type="password" v-model='formEmail.passWord' placeholder="请填写新密码(6-20位字母与字母或符号组成)" />
							</div>
						</el-form-item>
						<el-form-item prop="surePassword">
							<div class="input-wrap">
								<input type="password" v-model='formEmail.surePassword' placeholder="请重复新密码" />
							</div>
						</el-form-item>
					</el-form>

				</div>
				<div class="tab1">
					<div class="submit-wrap cursor">
						<div class="btn" @click="doSubmit">重置密码</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tab: 1,
				loading: {
					status: false,
					msg: "正在验证并重置密码~"
				},
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
					emailCode: "",
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
			sendMobileMessage: function() {
				var that = this;
				if (that.formMobile.counter.seconds == 0 || that.formMobile.counter.seconds == 120) {
					that.$refs.formMobile.validateField("userPhone", function(err) {
						if (!err) {
							that.loading.status = true;
							that.loading.msg = "正在发送手机验证码~";
							that.$post('users/sendPhoneVerificationCode', {
								userPhone: that.formMobile.userPhone
							}).then(respone => {
								if (respone.code == 0) {
									that.$alert("手机验证码发送成功", {
										confirmButtonText: '确定',
										callback: function(action) {
											that.loading.status = false;
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
			sendEmailMessage: function() {
				var that = this;
				if (that.formEmail.counter.seconds == 0 || that.formEmail.counter.seconds == 120) {
					that.$refs.formEmail.validateField("userEmail", function(err) {
						if (!err) {
							that.loading.status = true;
							that.loading.msg = "正在发送邮箱验证码~";
							that.$post('users/sendEmailVerificationCode', {
								userEmail: that.formEmail.userEmail
							}).then(respone => {
								if (respone.code == 0) {
									that.$alert("邮箱验证码发送成功", {
										confirmButtonText: '确定',
										callback: function(action) {
											that.loading.status = false;
											that.formEmail.counter.func = setInterval(function() {												
												if (that.formEmail.counter.seconds == 0) {
													clearInterval(that.formEmail.counter.func);
												}
												that.formEmail.counter.text = "重新发送验证码(" + that.formEmail.counter.seconds + ")";
												that.formEmail.counter.seconds--;
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
						duration: 3000 
					});
				} else {
					that.loading.status = false;
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
			doSubmit() {
				var that = this;
				if (this.tab == 1) {
					this.$refs.formMobile.validate((valid) => {
						if (valid) {
							that.loading.status = true;
							this.$post('/users/forgetPassWord', {
								userPhone: that.formMobile.userPhone,
								newPassWord: that.formMobile.passWord,
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
							this.$axios.post('/users/forgetPassWordFromEmail', {
								userEmail: that.formEmail.userEmail,
								newPassWord: that.formEmail.passWord,
								vCode: that.formEmail.emailCode,
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
					this.formEmail.emailCode = "";
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
			top: 75px;
		}

		.con-wrap {
			bottom: 3%;
			position: absolute;
		}
	}

	@media (min-height:800px) {
		.bg-wrap {
			position: absolute;
			bottom: 0;
			top: 75px;
		}

		.con-wrap {
			bottom: 6%;
			position: absolute;
		}
	}

	@media (min-height:900px) {
		.bg-wrap {
			position: absolute;
			bottom: 0;
			top: 75px;
		}

		.con-wrap {
			bottom: 10%;
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
				box-sizing: border-box;
				width: 50%;
				background: url(../../assets/images/block-bg.png) no-repeat center center;
				background-size: 100% 100%;
				margin: 0 auto;
				padding: 20px 140px 80px 120px;

				h1 {
					font-size: 24px;
					color: #fff;
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
						width: 250px;
						padding: 15px 0px;
					}

					.active {
						font-weight: 600;
						border-bottom: 2px solid #fff;
					}
				}

				.tab1 {
					padding-top: 20px;
					text-align: center;
					width: 480px;
					margin: 0 auto;

					p {
						color: #DDDDDD;
						font-size: 14px;
						line-height: 1.8;
						margin-bottom: 10px;
					}

					.input-wrap {
						display: flex;
						justify-content: space-between;
						align-items: center;

						&.input-key {
							input {
								width: 65%;
							}

							.btn {
								width: 35%;
							}
						}

						input {
							width: 100%;
							background: rgba(255, 255, 255, 0.1);
							border: 1px solid rgba(255, 255, 255, 1);
							border-radius: 4px;
							padding: 10px;
							color: #fff;
							font-size: 16px;
							box-sizing: border-box;

							~.btn {
								margin-left: 10px;
							}
						}

						.btn {
							color: #0077FF;
							background: rgba(255, 255, 255, 1);
							border-radius: 4px;
						}
					}

					.submit-wrap {
						.btn {
							color: #0077FF;
							height: 48px;
							background: rgba(255, 255, 255, 1);
							border-radius: 4px;
							font-size: 16px;
							line-height: 48px;
							display: block;
						}
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
