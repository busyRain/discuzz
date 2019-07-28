import request from "@/utils/request";
import postForm from "@/utils/postFormData";
export function getDetail(id) {
  //获取主楼详情
  return request(`/topic/${id}`, {
    method: "get"
  });
}
export function addDis(data) {
  //发贴子
  return postForm("/topiclogin/addtopic", {
    method: "post",
    data
  });
}
export function getReplay(data) {
  //获取回复贴子
  return request(`/topic/getreplylist`, {
    method: "get",
    params: data
  });
}
export function addReply(data) {
  //添加回复
  return request("/topiclogin/addreply", {
    method: "post",
    data
  });
}
export function deleteDis(data) {
  //删除贴子
  return request("/topiclogin/editreply", {
    method: "post",
    data
  });
}
export function updateCount(data){
//更新贴子点击数
  return request(`/topic/update/count/${data}`,{
    method:"post"
  })
}
export function banned(data) {
  //禁言接口
  return request(`section/banned/${data}`,{
    method:"post"
  })
}
export function deletebymoderator(data) {
  //版主删除
  return request(`topiclogin/deletebymoderator/${data.id}`,{
    method:"post",
    data
  })
}
export function noAddTopic(data) {
  console.log(data)
  //禁言
  return request(`/section/banned/${data.id}`,{
    method:"post",
    data
  })
}
export function addVoteTop(data) {
  return request(`/topiclogin/addVoteByTopic`,{
    method:"post",
    data
  })
}