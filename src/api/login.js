import request from "@/utils/request";
export function userlogin(data){//用户登录 
    return request("/users/login",{
        method:"post",
        data
    })
}
export function sendPhoneCode (data) { //发送手机验证码
    return request("users/sendPhoneVerificationCode",{
        method:"post",
        data
    })
}