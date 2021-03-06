import request from "@/utils/request"; 
export function getDetail(id) {
	//获取主楼详情
	return request(`/topic/${id}`, {
		method: "get"
	});
}
export function addDis(data) {
	//发帖子
	return request("/topiclogin/addtopic", {
		method: "post",
		data,
		transformRequest: [
			function(data) {
				let ret = "";
				for (let it in data) {
					ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
				}
				return ret;
			}
		],
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
}
export function getReplay(data) {
	//获取回复帖子
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
	//删除帖子
	return request(`/topiclogin/deletebyuser/${data.id}`, {
		method: "post",
		data
	});
}
export function updateCount(data) {
	//更新帖子点击数
	return request(`/topic/update/count/${data}`, {
		method: "post"
	})
}
export function banned(data) {
	//禁言接口
	return request(`section/banned/${data}`, {
		method: "post"
	})
}
export function deletebymoderator(data) {
	//版主删除
	return request(`topiclogin/deletebymoderator/${data.id}`, {
		method: "post",
		data
	})
}
export function noAddTopic(data) {
	//禁言
	return request(`/section/banned/${data.id}`, {
		method: "post",
		data
	})
}
export function addVoteTop(data) {
	return request(`/topiclogin/addVoteByTopic`, {
		method: "post",
		data
	})
}
export function updateTopic(data) { //更新帖子详情
	return request('/topiclogin/updatnewetopic', {
		method: "post",
		data
	})
}
export function getFollow(data) { //用户关注帖子
	return request(`/usersCenter/addfollow/${data}`, {
		method: 'get'
	})
}
export function delFollow(data) { //用户关注帖子
	return request(`/usersCenter/delfollow/${data}`, {
		method: 'get'
	})
}
export function getCollected(data) { //检测收藏
	return request("collect/getcollect", {
		method: "get",
		params: data
	});
}
export function setCollected(data) { //收藏
	return request("collect/addCollect", {
		method: "post",
		data
	});
}
export function cancelCollected(data) { //取消收藏
	return request("/collect/cancelcollect", {
		method: "post",
		data
	});
}
