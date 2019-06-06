<template>
	<div class="bg-wrap">
        <div class="con-wrap">
        	<h1>填写重要信息</h1>
            <div>
                <input type="text" v-model='phoneOrEmail' placeholder="手机号/邮箱">
            </div>
            <div class="code-wrap">
                <input class="code" type="text" v-model='code' placeholder="验证码">
                <div class="cursor">免费获取验证码</div>
            </div>
            <div class="btn-wrap">
                <div class="btn cursor">登录并绑定</div>
                <div class="later btn cursor">以后再说</div>
            </div>
        </div>
	</div>
</template>

<script>
    export default {
    	data(){
    		return {
                phoneOrEmail:'',
                code:''
    		}
    	}
  	}
</script>

<style scoped lang="scss">
.bg-wrap{
	background: url(/img/user/footer-bg.png) no-repeat bottom center;
    width: 100%;
    min-height: 415px;
    background-size: 100%;
    padding-bottom: 195px;
    .con-wrap{
        background: url(/img/user/block-bg.png) no-repeat center center;
        width: 1400px;
        height: 690px;
        background-size: 100% 100%;
        margin: 142px auto 0; 
        h1{
            font-size: 24px;
            font-weight: 600px;
            color: #fff;
            text-align: center;
            margin-bottom: 55px;
            padding-top: 142px;
        }
        >div{
            margin: 0 auto;
            width:350px;
            margin-bottom: 10px;
            input{
                width: 100%;
                height:48px;
                background:rgba(255,255,255,0.1);
                border:1px solid rgba(255,255,255,1);
                border-radius:4px;
                color: #fff;
                font-size: 14px;
                outline: none;
                box-sizing: border-box;
                padding-left: 10px;
            }
            
        }
        .code-wrap{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .code{
                width: 220px;
                border-radius: 4px 0 0 4px;
                display: block;
            }
            >div{
                width:130px;
                height:48px;
                background:rgba(255,255,255,1);
                border-radius:0px 4px 4px 0px;
                display: inline-block;
                line-height: 48px;
                font-size: 16px;
                text-align: center;
                color: #0077FF;
            }
        }
    }
    .btn-wrap{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn{
            width:170px;
            height:48px;
            background:rgba(94,181,74,1);
            border-radius:4px;
            font-size: 16px;
            text-align: center;
            color: #fff;
            line-height: 48px;
        }
        .later{
            background: #AAAAAA;
        }
    }
}
input::-webkit-input-placeholder {
    color: #fff;
    font-size: 14px;
}
</style>