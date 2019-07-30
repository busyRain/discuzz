function getCookie(name){
    var strCookie = document.cookie;
    var arrCookie =strCookie.split("; ");
    var cookie = "";
    for (var i = 0;i<arrCookie.length;i++){
        var arr = arrCookie[i].split("=");
        if(name.toLowerCase()==arr[0].toLowerCase()){
            cookie = arr[i];
            break;
        }
    }
    return cookie;
}
export default {
    getCookie
}