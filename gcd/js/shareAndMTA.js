if( window.shareData.tLink == "" ){
	window.shareData.tLink = window.location.href;
}
if( typeof( window.shareData.commas ) == "undefined" ){
	window.shareData.commas = "";
}

// wxshare
 var onBridgeReady = function () {
	var imgUrlArr = ['','teacher','moon','national','birthday','halloween','single','christmas', 'newyear','springfestival','valentine']; 
	var appId = '';
	var link, imgUrl, title, desc;
	var default_share_msg = function(){
		link = window.shareData.tLink;
		imgUrl = window.shareData.imgUrl;
		title = window.shareData.tTitle;
		desc = window.shareData.tContent;
	}
	default_share_msg();
	WeixinJSBridge.on('menu:share:appmessage', function(argv){
		default_share_msg();
		WeixinJSBridge.invoke('sendAppMessage',{
			"appid" : appId,
			"img_url" : imgUrl,
			"img_width" : "640",
			"img_height" : "640",
			"link" : link,
			"desc" : desc,
			"title" : title
			}, function(res) {})
	});
	WeixinJSBridge.on('menu:share:timeline', function(argv){
		default_share_msg();
		WeixinJSBridge.invoke('shareTimeline',{
			"img_url" : imgUrl,
			"img_width" : "640",
			"img_height" : "640",
			"link" : link,
			"desc" : desc,
			"title" : title + window.shareData.commas + desc
		}, function(res) {});
	});
};

if(document.addEventListener){
	document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
} else if(document.attachEvent){
	document.attachEvent('WeixinJSBridgeReady' , onBridgeReady);
	document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
}


var _mtac = {};
(function() {
	var mta = document.createElement("script");
	mta.src = "https://pingjs.qq.com/h5/stats.js?v2.0.4";
	mta.setAttribute("name", "MTAH5");
	mta.setAttribute("sid", "500306978");

	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(mta, s);
})();

//newsShare
var isQQnews = navigator.userAgent.match(/qqnews\/([\.\d ]+)/i);
if( isQQnews ){
    jQuery.getScript("js/news.js", function(data, status, jqxhr) {
		if (window.TencentNews && window.TencentNews.setGestureQuit) {
			window.TencentNews.setGestureQuit(true);
		}
		//è®¾ç½®åˆ†äº«
		if(window.TencentNews && window.TencentNews.setShareArticleInfo){
            window.TencentNews.setShareArticleInfo( window.shareData.tTitle , window.shareData.tTitle , window.shareData.tContent , window.shareData.tLink , window.shareData.imgUrl  );
        }
	});
}
