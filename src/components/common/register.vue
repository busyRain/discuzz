<template>
<div v-loading="loading.status"
        :element-loading-text="loading.msg"
        element-loading-spinner="el-icon-loading" 
        element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="registerBlock"> 
        <el-dialog 
            :visible.sync="registerVisible"
            :before-close="cancel"
        >
            <div class="registerB">
                <div class="form-header">
                    <div class="title">会员注册</div>
                    <div class="sub-title">
                        <span>Welcome to</span>&nbsp;
                        <span>Fei Paradise.</span>
                    </div>
               </div> 
            </div>
            <div class="wrapper-form-inner">
                <el-tabs v-model="currentTabIndex" @tab-click="changeTab">
                    <el-tab-pane label="手机号注册" name="1">
                        <el-form :model="formMobile" :rules="rulesMobile" ref="formMobile" class="form-register">
                            <el-form-item prop="userPhone">
                                <el-input v-model="formMobile.userPhone" type="text" placeholder="请输入你的手机号码">
                                    <template slot="append">
                                        <i class="el-icon-phone"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="vCode">
                                <el-input v-model="formMobile.vCode" type="text" placeholder="验证码">
                                    <template slot="append">
                                        <div class="get-code cursor" @click="sendMobileMessage"><span v-text="formMobile.counter.text"></span></div>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="passWord">
                                <el-input v-model="formMobile.passWord" type="password" placeholder="6-20位字母、符号组合">
                                    <template slot="append">
                                        <i class="el-icon-lock"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="surePassword">
                                <el-input v-model="formMobile.surePassword" type="password" placeholder="请重复密码">
                                    <template slot="append">
                                        <i class="el-icon-lock"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="邮箱注册" name="2">
                        <el-form :model="formEmail" :rules="rulesEmail" ref="formEmail" class="form-register">
                            <el-form-item prop="userEmail" inline-message="true">
                                <el-input v-model="formEmail.userEmail" type="text" placeholder="请输入你的邮箱">
                                    <template slot="append">
                                        <i class="el-icon-message"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="emailCode">
                                <el-input v-model="formEmail.emailCode" type="text" placeholder="邮箱验证码">
                                    <template slot="append">
                                        <div class="get-code cursor" @click="sendEmailMessage"><span v-text="formEmail.counter.text"></span></div>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="passWord">
                                <el-input v-model="formEmail.passWord" type="password" placeholder="6-20位字母与字母或符号组成">
                                    <template slot="append">
                                        <i class="el-icon-lock"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="surePassword">
                                <el-input v-model="formEmail.surePassword" type="password" placeholder="请重复密码">
                                    <template slot="append">
                                        <i class="el-icon-lock"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="账号注册" name="3" v-if="currentTabIndex==3">
                        <el-form :model="formUser" ref="formUser" :rules="rulesUserName">
                            <el-form-item prop="userName">
                                <el-input placeholder="请输入账号" v-model="formUser.userName">
                                    <template slot="append">
                                        <i class="el-icon-user"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="passWord">
                                <el-input placeholder="6-20位字母与字母或符号组成" v-model="formUser.passWord" type="password">
                                    <template slot="append">
                                        <i class="el-icon-lock"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="surePassword">
                                <el-input placeholder="请重复密码" v-model="formUser.surePassword" type="password">
                                    <template slot="append">
                                        <i class="el-icon-lock"></i>
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
                <el-row class="bottom-button-box">
                    <el-button type="primary" @click="register">
                        确认注册
                    </el-button>
                </el-row>
                <el-row class="other">
                    <el-col :span="12">
                        <el-button type="text" @click="currentTabIndex='3'">账号注册</el-button>
                    </el-col>
                    <el-col :span="12" class="is-right">
                        <div class="already">
                            已有账号？
                            <el-button type="text" @click="goLogin">马上登录</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</div>
</template>
<script>
import * as api from '@/api/login';
export default {
    name:"register",
    props:['registerVisible'],
    data() {
			return {
				loading: {
					status: false,
					msg: '正在提交注册信息~'
				},
				checked: false,
				currentTabIndex: '1',
				formMobile: {
					userPhone: '',
					passWord: '',
					surePassword: '',
					vCode: '',
					counter: {
						text: '验证码',
						seconds: 120,
						func: null
					}
				},
				formEmail: {
					userEmail: '',
					passWord: '',
					surePassword: '',
					emailCode: '',
					counter: {
						text: '邮箱验证码',
						seconds: 120,
						func: null
					}
				},
				formUser: {
					userName: '',
					passWord: '',
					surePassword: ''
				},
				rulesMobile: {
					userPhone: [{
						validator: (rule, value, callback) => {
							if (!value) {
								return callback(new Error('请输入10位手机号,如 1234567890'));
								// } else if (!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9]|16[0-9])\d{8}$/.test(value)) {
							} else if (!/^(\+?\d{10})$/.test(value)) {
								return callback(new Error('请输入10位手机号,如 1234567890'));
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
							} else if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
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
				},
				rulesUserName: {
					userName: [{
						validator: (rule, value, callback) => {
							if (!value) {
								return callback(new Error('请输入账号'));
							} else if (!/^[0-9a-zA-Z_]{6,20}$/.test(value)) {
								return callback(new Error('6-20位字母、数字、_组成'));
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
									this.$refs.formUser.validateField('surePassword');
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
							} else if (value !== this.formUser.passWord) {
								callback(new Error('两次输入密码不一致!'));
							} else {
								callback();
							}
						},
						trigger: 'blur'
					}]
				},
			};
		},
    methods:{
        goLogin(){
            this.$emit('goLogin',true) 
            this.$emit('cancelRegister',false)
        },
        cancel(){
            this.$emit('cancelRegister',false)
        },
        sendMobileMessage: function() {
				var that = this;
				if (that.formMobile.counter.seconds == 0 || that.formMobile.counter.seconds == 120) {
					that.$refs.formMobile.validateField('userPhone', function(err) {
						if (!err) {
							that.loading.status = true;
							that.loading.msg = '正在发送手机验证码~';
							api.sendPhoneCode({
								userPhone: that.formMobile.userPhone
							}).then(respone => {
								if (respone.code == 0) {
									that.$alert('手机验证码发送成功', {
										confirmButtonText: '确定',
										callback: function(action) {
											that.loading.status = false;
											that.formMobile.counter.func = setInterval(function() {
												if (that.formMobile.counter.seconds == 0) {
													clearInterval(that.formMobile.counter.func);
													that.formMobile.counter.text = '重新发送验证码';
													that.formMobile.counter.seconds = 120;
												} else {
													that.formMobile.counter.text = '重新发送验证码(' + that.formMobile.counter.seconds + ')';
													that.formMobile.counter.seconds--;
												}
											}, 1000);
										}
									});
								} else {
									var _msg = '';									
									_msg = respone.msg ? respone.msg : respone.message;
									that.$alert(_msg, {
										confirmButtonText: '确定',
										callback: function() {
											that.loading.status = false;
										}
									});
								}
							});
						}
					});
				}
			},
			sendEmailMessage: function() {
				var that = this;
				if (that.formEmail.counter.seconds == 0 || that.formEmail.counter.seconds == 120) {
					that.$refs.formEmail.validateField('userEmail', function(err) {
						if (!err) {
							that.loading.status = true;
							that.loading.msg = '正在发送邮箱验证码~';
							api.sendEmalCode({
								userEmail: that.formEmail.userEmail
							}).then(respone => {
								if (respone.code == 0) {
									that.$alert('邮箱验证码发送成功', {
										confirmButtonText: '确定',
										callback: function(action) {
											that.loading.status = false;
											that.formEmail.counter.func = setInterval(function() {
												if (that.formEmail.counter.seconds == 0) {
													clearInterval(that.formEmail.counter.func);
													that.formEmail.counter.text = '重新发送验证码';
													that.formEmail.counter.seconds = 120;
												} else {
													that.formEmail.counter.text = '重新发送验证码(' + that.formEmail.counter.seconds + ')';
													that.formEmail.counter.seconds--;
												}
											}, 1000);
										}
									});
								} else {
									var _msg = '';
									_msg = respone.msg ? respone.msg : respone.message;
									that.$alert(_msg, {
										confirmButtonText: '确定',
										callback: function() {
											that.loading.status = false;
										}
									});
								}
							});
						}
					});
				}
			},
			onSuccess(username, respone) {
				var that = this;
				if (respone.code == 0) {
					that.loading.msg = '注册成功，正在初始化账号信息';
                    this.$emit('cancelRegister',false)
					that.$store.dispatch('LoginDia', {
						token: respone.data,
						username: username
					});

					that.$message({
						message: respone.msg,
						type: 'success',
						duration: 3000,
						onClose() {
							// that.loading.status = false;
							that.$router.push({
								name: 'member-edit'
							});
						}
					});
				} else {
					var _msg = '';
					_msg = respone.msg ? respone.msg : respone.message;
					that.$alert(_msg, {
						confirmButtonText: '确定',
						callback: function() {
							that.loading.status = false;
						}
					});
				}
			},
			register() {
				let that = this;
				if (this.currentTabIndex == 1) {
					this.$refs.formMobile.validate(valid => {
						if (valid) {
							that.loading.status = true;
							that.loading.msg = '正在提交注册信息~';
							api.sendUserMobile({
								userPhone: that.formMobile.userPhone,
								passWord: that.formMobile.passWord,
								vCode: Number(that.formMobile.vCode)
							}).then(
								res => {
									// that.loading.status = false;
									that.onSuccess(that.formMobile.userPhone, res);
								},
								res => {
									that.loading.status = false;
									that.$alert(res.response.message, {
										confirmButtonText: '确定'
									});
								}
							);
						} else {
							return false;
						}
					});
				} else if (this.currentTabIndex == 2) {
					this.$refs.formEmail.validate(valid => {
						if (valid) {
							that.loading.status = true;
							that.loading.msg = '正在提交注册信息~';
							api.sendUserEmail({
								userEmail: that.formEmail.userEmail,
								passWord: that.formEmail.passWord,
								vCode: that.formEmail.emailCode
							}).then(
								res => {
									that.onSuccess(that.formEmail.userEmail, res);
								},
								res => {
									that.loading.status = false;
									that.$alert(res.response.message, {
										confirmButtonText: '确定'
									});
								}
							);
						} else {
							return false;
						}
					});
				} else if (this.currentTabIndex == 3) {
					this.$refs.formUser.validate(valid => {
						if (valid) {
							that.loading.status = true;
							that.loading.msg = '正在提交注册信息~';
							api.loginName({
								loginName: that.formUser.userName,
								passWord: that.formUser.passWord
							}).then(
								res => {
									that.onSuccess(that.formUser.userName, res);
								},
								res => {
									that.loading.status = false;
									that.$alert(res.response.message, {
										confirmButtonText: '确定'
									});
								}
							);
						} else {
							return false;
						}
					})
				}
			},
			changeTab() {
				if (this.currentTabIndex == 1) {
					this.formMobile.userPhone = '';
					this.formMobile.passWord = '';
					this.formMobile.surePassword = '';
					this.formMobile.vCode = '';
					setTimeout(() => {
						this.$refs.formMobile.resetFields();
					}, 10);
				} else {
					this.formEmail.userEmail = '';
					this.formEmail.passWord = '';
					this.formEmail.surePassword = '';
					this.formEmail.emailCode = '';
					setTimeout(() => {
						this.$refs.formEmail.resetFields();
					}, 10);
				}
			}
    }
}
</script>

