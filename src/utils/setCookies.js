import {
	Base64
} from "js-base64";
import localStore from "@/utils/auth.js";
var ls = new localStore();
export const SetCookies = (name, value) => {
	ls.set(name, Base64.encode(value));
};
export const GetCookies = name => {
	try {
		let val = ls.get(name);
		if (val) {
			return Base64.decode(val);
		} else {
			return null;
		}
	} catch (e) {
		console.log(e);
		return null;
	}
};
export const DelCookies = name => {
	ls.del(name);
};

export const GetCookie = name => {
	//获取cookie字符串
	var strCookie = document.cookie;
	//将多cookie切割为多个名/值对
	var arrCookie = strCookie.split("; ");

	var cookie = "";
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (name.toLowerCase() == arr[0].toLowerCase()) {
			cookie = arr[1];
			break;
		}
	}
	return cookie;

}
