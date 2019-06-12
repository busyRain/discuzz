<template>
	<div class="bg-wrap" v-loading="loading" element-loading-text="正在验证用户信息~" element-loading-spinner="el-icon-loading"
	 element-loading-background="rgba(0, 0, 0, 0.6)">
		<div class="con-wrap">
			<div class="con-inner">
				<div class="left">
					<p class="title">欢迎菲乐园！</p>
					<p class="sub-title">Welcome to Fei Paradise.</p>
					<el-form :model="loginForm" :rules="rules" ref="loginForm">
						<el-form-item prop="userName">
							<div class="phone">
								<img src="@/assets/images/icon-phone.png" alt="">
								<input type="text" v-model="loginForm.userName" placeholder="请输入的你的手机号码" />
							</div>
						</el-form-item>
						<el-form-item prop="passWord">
							<div class="phone">
								<img src="@/assets/images/icon-lock.png" alt="">
								<input type="password" v-model="loginForm.passWord" placeholder="6-20位字母与字母或符号组成" />
								<img class="eye" src="@/assets/images/icon-eye.png" alt="">
							</div>
						</el-form-item>
						<div class="rember">
							<div>
								<div class="checked cursor" @click='rember'>
									<span v-show='loginForm.checked' class="iconfont icon-duihao"></span>
								</div>
								<span class="tip">下次自动登录</span>
							</div>
							<div>
								<span class="cursor forget" @click='$router.push("/user/findPassword")'>忘记密码？</span>
							</div>
						</div>
						<div class="login-btn" @click='login'>登录</div>
						<div class="register">
							还没有账号？点击<span class="cursor" @click='$router.push("/user/register")'>立即注册</span>
						</div>
					</el-form>
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
import * as api from '@/api/login'
export default {
    name: "login",
    data() {
        var checkUserName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入手机号'));
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
            loading: false,
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
            }
        };
    },
    methods: {
        async userLogin(data){
            let that = this;
            await api.userlogin(data).then(
                res=>{
                    console.log(res)
                    that.loading = false;
                    if (res.code == 0) {
                        // 登陆成功
                        let userInfo = {
                            token: res.data,
                            loginName: that.loginForm.userName,
                        }
                        that.$setCookie("uInfo", JSON.stringify(userInfo));
                        that.$router.back();
                    } else {
                        let _msg = "";
                        if (res.status == 200) {
                            _msg = res.msg;
                        } else {
                            _msg = res.message;
                        }
                        that.$message({
                            message: _msg,
                            type: 'error',
                            duration: 3000,
                        });
                    }
                }
            ) 
        },
        login() {
            let that = this;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    that.loading = true;
                    this.userLogin({
                        loginName: that.loginForm.userName,
                        passWord: that.loginForm.passWord
                    })
                } else {
                    return false;
                }
            })
        },
        rember() {
            this.loginForm.checked = !this.loginForm.checked;
        }
    }
}
</script>
<style scoped lang="scss">
@media (max-height:768px) {
    .bg-wrap {
        padding: 6% 0;
    }
    .con-wrap {
        height: 500px;
    }
}
@media (min-height:768px) and (max-height:799px) {
    .bg-wrap {
        position: absolute;
        bottom: 0;
        top: 75px;
    }
    .con-wrap {
        height: 600px;
        bottom: 10%;
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
        height: 600px;
        bottom: 150px;
        position: absolute;
    }
}
.bg-wrap {
    background: url('../../assets/images/footer-bg.png') no-repeat bottom center;
    width: 100%;
    min-height: 415px;
    background-size: 100%;
    .con-wrap {
        box-sizing: border-box;
        width: 100%;
        .con-inner {
            margin: 0 auto 0;
            display: flex;
            justify-content: center;
            box-sizing: border-box;
            width: 1400px;
            background: url('../../assets/images/block-bg.png') no-repeat center center;
            background-size: 100% 100%;
            padding: 50px 206px 50px 266px;
            .left {
                width: 50%;
                position: relative;
                .title {
                    font-size: 40px;
                    color: #FFFFFF;
                    box-sizing: border-box;
                }
                .sub-title {
                    font-size: 14px;
                    color: #fff;
                    padding-top: 10px;
                    padding-bottom: 52px;
                }
                .phone {
                    width: 350px;
                    height: 48px;
                    background: rgba(255, 255, 255, .1);
                    border: 1px solid rgba(255, 255, 255, 1);
                    border-radius: 24px;
                    padding: 9px 10px 9px 24px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    >div {
                        border-right: 1px solid #fff;
                        img {
                            width: 17px;
                            height: 25px;
                            margin-right: 17px;
                        }
                    }
                    input {
                        width: 98%;
                        padding-left: 17px;
                        background: rgba(255, 255, 255, 0);
                        height: 100%;
                        outline: none;
                        border: 0;
                        color: #fff;
                        font-size: 16px;
                    }
                    .eye {
                        padding-left: 20px;
                    }
                }
                .phone:last-child {
                    padding-bottom: 11px;
                }
                .rember {
                    width: 350px;
                    color: #fff;
                    font-size: 14px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .checked {
                        width: 16px;
                        height: 16px;
                        display: inline-block;
                        border: 1px solid #fff;
                        margin-right: 4px;
                        vertical-align: middle;
                        .icon-duihao {
                            font-size: 16px;
                            color: #fff;
                            display: inline-block;
                        }
                    }
                    .tip {
                        vertical-align: middle;
                    }
                    .forget {
                        color: #FFC766;
                    }
                }
                .login-btn {
                    width: 350px;
                    height: 48px;
                    border-radius: 24px;
                    background: #fff;
                    color: #0077FF;
                    font-size: 20px;
                    line-height: 48px;
                    text-align: center;
                    margin-top: 35px;
                    margin-bottom: 10px;
                    cursor: pointer;
                }
                .register {
                    font-size: 16px;
                    width: 350px;
                    text-align: center;
                    color: #ddd;

                    span {
                        color: #FFDD66;
                        border-bottom: 1px solid #FFDD66;
                    }
                }
                &:after {
                    width: 1px;
                    display: inline-block;
                    content: '';
                    background: #fff;
                    position: absolute;
                    right: 10%;
                    top: 30%;
                    bottom: 10%;
                }
                .el-form {
                    padding-right: 20%;

                    .el-form-item {
                        margin-bottom: 30px;

                        .el-form-item__error {
                            left: 70px;
                        }
                    }
                }
            }
            .right {
                width: 50%;
                padding-top: 6%;
                .other-login {
                    text-align: center;
                    font-size: 20px;
                    color: #fff;
                    padding: 50px 0px 60px;
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
                    margin-bottom: 55px;
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
                    font-size: 16px;
                    display: none;
                }
            }
        }
    }
}
input::-webkit-input-placeholder {
    color: #fff;
    font-size: 16px;
}
</style>
