var version = parseFloat(RegExp.$1);
var phoneScale = parseInt(window.screen.width) / 640;
var u = navigator.userAgent;
var isQQnews = u.match(/qqnews\/([\.\d ]+)/i);
var ua = 'othre',
	plat = 'other';
if(u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
	plat = 'weixin';
}
if(u.match(/qqnews\/([\.\d ]+)/i)) {
	plat = 'newsapp';
}
if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
	ua = 'android';
}
if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
	ua = 'ios';
}
if(ua == 'android' && version > 2.3) {
	document.write('<meta name="viewport" content="width=640, maximum-scale=' + phoneScale + ', minimum-scale=' + phoneScale + ', user-scalable=no , target-densitydpi=device-dpi">');
} else {
	document.write('<meta name="viewport" content="width=640, user-scalable=no , target-densitydpi=device-dpi">');
}
if(plat != 'weixin' && ua == 'android' && window.innerWidth != 640) {
	document.getElementsByTagName("html")[0].setAttribute("style", "zoom:" + phoneScale);
}
//固定分辨率宽为640: 适配腾讯新闻及微信/*  |xGv00|9f161f440423a5baeba2994f55499eda */