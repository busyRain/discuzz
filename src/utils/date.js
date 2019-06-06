export default function(Vue) {
  Vue.filter("dateTime", function(time) {
    let t = Date.now() - time;
    let days = Math.floor(t / (24 * 60 * 60 * 1000));
    let hours = Math.floor(t / (60 * 60 * 1000));
    let minutes = Math.floor(t / (60 * 1000));
    //let seconds = Math.floor(t / 1000);
    if (days > 0) {
      return days + "天前";
    } else if (hours > 0) {
      return hours + "小时前";
    } else if (minutes > 0) {
      return minutes + "分钟前";
    } else {
      return "刚刚";
    }
  });
}
