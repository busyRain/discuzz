<template>
	<div class="bg-wrap">
		<div class="con-wrap">
			<div class="con-inner">
				<h1>找回密码</h1>
				<ul class='tab'>
					<li class="cursor" @click='tab = 1' :class="tab == 1 ? 'active' : ''">通过短信注册</li>
					<li class="cursor" @click='tab = 2' :class="tab == 2 ? 'active' : ''">通过邮箱注册</li>
				</ul>
				<div class="tab1" v-if='tab == 1'>
					<p>请输入注册时绑定的手机号码，我们会马上把确认短信发送给您</p>
					<el-form>
						<el-form-item>
							<div class="input-wrap input-key">
								<input type="text" v-model='phone' placeholder="请填写手机号码" />
								<div class="btn cursor">发送手机验证码</div>
							</div>
						</el-form-item>
						<el-form-item>
							<div class="input-wrap">
								<input type="text" v-model='phone' placeholder="请填写手机验证码" />
							</div>
						</el-form-item>
						<el-form-item>
							<div class="input-wrap">
								<input type="password" v-model='phone' placeholder="请填写新密码" />
							</div>
						</el-form-item>
						<el-form-item>
							<div class="input-wrap">
								<input type="password" v-model='phone' placeholder="请重复新密码" />
							</div>
						</el-form-item>
					</el-form>
				</div>
				<div class="tab1" v-if='tab == 2'>
					<p>请输入注册时绑定的邮箱，我们会马上把确认短信发送给您</p>
					<el-form>
						<el-form-item>
							<div class="input-wrap input-key">
								<input type="text" v-model='email' placeholder="请填写邮箱验" />
								<div class="btn cursor">发送邮件验证码</div>
							</div>
						</el-form-item>
						<el-form-item>
							<div class="input-wrap">
								<input type="text" v-model='email' placeholder="请填写邮箱验验证码" />
							</div>
						</el-form-item>
						<el-form-item>
							<div class="input-wrap">
								<input type="password" v-model='email' placeholder="请填写新密码" />
							</div>
						</el-form-item>
						<el-form-item>
							<div class="input-wrap">
								<input type="password" v-model='email' placeholder="请重复新密码" />
							</div>
						</el-form-item>
					</el-form>
				</div>
				<div class="tab1">
					<div class="submit-wrap cursor">
						<div class="btn">重置密码</div>
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
            phone: '',
            email: '',
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
        bottom: 50px;
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
                font-weight: 600;
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
                        border-radius:30px;
                        padding: 10px;
                        color: #fff;
                        font-size: 16px;
                        box-sizing: border-box;						
                        ~ .btn{								
                            margin-left: 10px;
                        }
                    }
                    .btn {
                        color: #0077FF;  
                        background: rgba(255, 255, 255, 1);
                        border-radius: 30px; 
                    }
                }					
                .submit-wrap{
                    .btn{
                        color: #0077FF;
                        height: 48px;
                        background: rgba(255, 255, 255, 1);
                        border-radius: 30px;
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
