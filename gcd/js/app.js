$("body").on('touchmove', function(e) {
	e.preventDefault();
})
if(typeof WeixinJSBridge == "undefined") {
	var i = 0;
	if(document.addEventListener) {
		document.addEventListener("WeixinJSBridgeReady", function func() {
			$("#bgm")[0].play();
		}, false);
	}
}
var isPlay = true;
$("#music-icon").click(function() {
	if($(this).hasClass('pause')) {
		isPlay = true;
		$(this).removeClass('pause');
		$("#bgm")[0].play();
	} else {
		isPlay = false;
		$(this).addClass('pause');
		$("#bgm")[0].pause();
	}
});

$(document).ready(function() {
	var x = 0;
	var $t1List = $(".t1 span");
	var timer = setInterval(function(){
		$t1List.eq(x).css('display','block');
		x++;
		if( x == 14 ){
			clearInterval(timer);
		}
	},800);
});