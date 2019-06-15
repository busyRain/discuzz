import request from "@/utils/request";
export function userlogin(data) {//用户登录 
    return request("/users/login",{
        method:"post",
        data
    })
}
export function getUser(){
    return request('/usersCenter/getUserInfo',{
        method:"post"
    })
}
export function sendPhoneCode (data) { //发送手机验证码
    return request("users/sendPhoneVerificationCode",{
        method:"post",
        data
    })
}
export function sendEmalCode (data) { //发送邮箱验证码
    return request("users/sendEmailVerificationCode",{
        method:"post",
        data
    })
}
export function sendUserMobile (data) {//注册手机号
    return request("/users/register/mobile",{
        method:"post",
        data
    })
}
export function sendUserEmail (data) {//注册邮箱
    return request("/users/register/email",{
        method:"post",
        data
    })
}
export function forgetPassWordMobile (data) {//重置手机密码
    return request("/users/forgetPassWord",{
        method:"post",
        data
    })
}
export function forgetPasswordEmail (data) {//重置email密码
    return request("/users/forgetPassWordFromEmail",{
        method:"post",
        data
    })
}
