// 获取用户信息
function setCookie(name, value) {
	var Days = 365;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ';path=/';
	// 作用域全域名,单页则删除  + ';path=/'
	return value;
}

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return false;
}

//将url中的参数转换成json格式
function urlToJson() { //默认参数为当前链接
	var url = arguments[0] || window.location.href;
	if(url.indexOf('?') < 0) {
		return false; //不存在参数返回false
	} else {
		var paraString = url.substring(url.indexOf('?') + 1, url.length);
		var paraJsonString;
		paraJsonString = paraString.replace(/\=/g, "\"\:\"");
		paraJsonString = paraJsonString.replace(/\&/g, "\",\"");
		paraJsonString = paraJsonString.replace(/\+/g, " ");
		paraJsonString = paraJsonString.replace(/\%26/g, "&");
		paraJsonString = paraJsonString.replace(/\%2F/g, "\/");
		paraJsonString = paraJsonString.replace(/\%0A/g, "\:");
		paraJsonString = '{"' + paraJsonString + '"}';
		return JSON.parse(paraJsonString);
	}
}

window.userData = new Object();

var urlData = urlToJson();
userData.nickName = false;
//跳转前把信息存入cookie
setCookie('saveData',JSON.stringify(urlData));	

if(urlData == false) {
	userData.nickName = getCookie('nickName');
	userData.headimgurl = getCookie('headimgurl');
	userData.openID = getCookie('openID');
} else {
	userData.nickName = decodeURI(urlData.nickName);
	userData.headimgurl = urlData.headimgurl;
	userData.openID = urlData.openID;
}
console.log(urlData.nickName);
var pageUrl = window.location.href;
pageUrl = pageUrl.split('?')[0]; //去掉参数
if(userData.nickName == false || userData.nickName == 'false' || userData.nickName == "undefined" || typeof(userData.nickName) == "undefined") {
	window.location.replace('http://webox.daxiangw.com/daxiangw/h5/wxinfo?redirect_uri=' + pageUrl);
} else {
	setCookie('nickName', userData.nickName);
	setCookie('headimgurl', userData.headimgurl);
	setCookie('openID', userData.openID);
}
var saveData = JSON.parse(getCookie('saveData'));