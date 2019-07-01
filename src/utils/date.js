export default function(Vue) {
  Vue.filter("dateTime", function(time) {
    let result="";
    let t = Date.now() - time;
    let days = Math.floor(t / (24 * 60 * 60 * 1000));
    let hours = Math.floor(t / (60 * 60 * 1000));
    let minutes = Math.floor(t / (60 * 1000));
    let y_o = (new Date(time)).getFullYear(),y_n = (new Date()).getFullYear();
    let M_o = (new Date(time)).getMonth(),   M_n = (new Date()).getMonth();//月
    let d_o = (new Date(time)).getDate(),    d_n = (new Date()).getDate();//日
    let h_o = (new Date(time)).getHours(),   h_n = (new Date()).getHours(); //小时
    let m_o = (new Date(time)).getMinutes(), m_n = (new Date()).getMinutes(); //分
    function pad(num, n) {
      let len = num.toString().length;
      while(len < n) {
          num = "0" + num;
          len++;
      }
      return num;
    }
    if (days >=2) {
      result=(y_o + '')+"-"+ pad(M_o+1,2)+ "-" +pad(d_o,2)+" "+pad(h_o,2)+":"+pad(m_o,2); 
    }else{
      if (hours > 0) {
        return hours + "小时前";
      } else if (minutes > 0) {
        return minutes + "分钟前";
      } else {
        return "刚刚";
      }
    }
    return result ||'';
  });
Vue.filter('dateComment',function(time){
  let result="";
    let t = Date.now() - time;
    let days = Math.floor(t / (24 * 60 * 60 * 1000));
    let hours = Math.floor(t / (60 * 60 * 1000));
    let minutes = Math.floor(t / (60 * 1000));
    let y_o = (new Date(time)).getFullYear(),y_n = (new Date()).getFullYear();
    let M_o = (new Date(time)).getMonth(),   M_n = (new Date()).getMonth();//月
    let d_o = (new Date(time)).getDate(),    d_n = (new Date()).getDate();//日
    let h_o = (new Date(time)).getHours(),   h_n = (new Date()).getHours(); //小时
    let m_o = (new Date(time)).getMinutes(), m_n = (new Date()).getMinutes(); //分
    var s_o = (new Date(time)).getSeconds(), s_n = (new Date()).getSeconds();//秒
    function pad(num, n) {
      let len = num.toString().length;
      while(len < n) {
          num = "0" + num;
          len++;
      }
      return num;
    }
    if (days >=2) {
      result=(y_o + '')+"-"+ pad(M_o+1,2)+ "-" +pad(d_o,2)+" "+pad(h_o,2)+":"+pad(m_o,2)+":"+pad(s_o,2); 
    }else{
      if (hours > 0) {
        return hours + "小时前";
      } else if (minutes > 0) {
        return minutes + "分钟前";
      } else {
        return "刚刚";
      }
    }
    return result ||'';
})
Vue.filter('dateNewComment',function(date){
    if(!date) {
      return;
    }
   
    function pad(num, n) {
        var len = num.toString().length;
        while(len < n) {
            num = "0" + num;
            len++;
        }
        return num;
      }
    var dateTime = "";
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    function getDateDiff2(dateTimeStamp){
        date=new Date(date)

        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;
       
        var y_o = (new Date(date)).getFullYear(),y_n = (new Date()).getFullYear();
        var d_o = (new Date(date)).getDate(),    d_n = (new Date()).getDate();//日
        var h_o = (new Date(date)).getHours(),   h_n = (new Date()).getHours(); //小时
        var m_o = (new Date(date)).getMinutes(), m_n = (new Date()).getMinutes(); //分
        var s_o = (new Date(date)).getSeconds(), s_n = (new Date()).getSeconds();//秒
        var result="";
        if(y_o!=y_n){
              result=(y_o + '')+"-"+ pad(date.getMonth() + 1,2)+ "-" +pad(d_o,2)+" "+pad(h_o,2)+":"+pad(m_o,2); 
         }else if (y_n == y_o){
              if(d_n-d_o==1){
                  result="昨天 "+pad(h_o,2)+":"+pad(m_o,2);
              }else if(d_n-d_o>1){
                  //result="";
                  result=pad(date.getMonth() + 1,2)+ "-" +pad(date.getDate(),2)+" "+pad(h_o,2)+":"+pad(m_o,2);
              }else {
                if(hourC >= 1){
                  result = parseInt(hourC) + '小时前';
                }else{

                  // if(minC>30){
                //       	result=pad(h_o,2)+":"+pad(m_o,2);
                 //    }else 
                   if (minC<60 && minC>=1){
                        if(m_n-m_o==0)
                            result=Math.abs(m_n-m_o+1)+"分钟前";
                        else{
                            result=Math.abs(m_n-m_o)+"分钟前";
                        }
                    }else {
                        result="刚刚";
                    }
                }
                  
              }
        }
        return result ||'';
      }
    dateTime = getDateDiff2(date);
    return dateTime;
});
}
