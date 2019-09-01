import request from "@/utils/request";


export function getUserInfo(id) {
	return request("/homepage/getUserInfo", {
		method: "get",
		params: {
			uid: id
		}
	});
}

export function getUserMedalList(params) {
	return request("/homepage/userHomeMedalList", {
		method: "get",
		params: params
	});
}

export function getUserTopicList(params) {
	return request("/homepage/getmytopiclist", {
		method: "get",
		params: params
	});
}

export function getUserReplyTopicList(params) {
	return request("/homepage/getnewmyreplytopiclist", {
		method: "get",
		params: params
	});
}


export function addblacklist(data) {
	return request("/usersCenter/addblacklist?touserid=" + data.touserid, {
		method: "post"
	});
}
