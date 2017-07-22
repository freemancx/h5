$("body").on('touchmove', function(e) {
	e.preventDefault();
})
//音频s
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
//音频e

$(window).load(function() {
	var x = 0;
	var $t1List = $(".t1 span");
	var timer = setInterval(function(){
		$t1List.eq(x).css('display','block');
		x++;
		if( x == 14 ){
			clearInterval(timer);
			$(".loading-txt").css('width','100%');
			setTimeout(function(){
				$(".page-02").show().addClass('animated');
				
			},100);
		}
	},500);
	
	$(".page-04").show().addClass('animated');
	showMap();
	
});

var wasHammer = false;
var hammerCount = 0;
$(".chuizi").click(function(){
//	锤子砸击
	if( wasHammer ) return;
	wasHammer = true;
	
	if( hammerCount == 0 ){
		$(".chuizi").removeClass('item10 fadeIn');
		$(".chuizi").css('opacity',1);
		$(".chuizi").addClass('ready');
		$(".page-02 .tips").show();
		hammerCount++;
		wasHammer = false;
		$(".liefeng").show();
		return;
	}else{
		$("#chuizibg")[0].currentTime = 0;
		$("#chuizibg")[0].play();
		$(".chuizi").addClass('hammering');
	}
	
	
	setTimeout(function(){
		switch (hammerCount){
			case 1:{
				$(".liefeng img").eq(0).show();
				break;
			}
			case 2:{
				$(".liefeng img").eq(1).show();
				break;
			}
			case 3:{
				$(".podong").show();
				$("#poqiangbg")[0].play();
				
				setTimeout(function(){
					$(".page-03").show().addClass('animated');
					$("#bianfubg")[0].play();
				},2000);
				break;
			}
			default:
				break;
		}
		
		
	},600);
	setTimeout(function(){
		hammerCount++;
		wasHammer = false;
		$(".chuizi").removeClass('hammering');
	},1500);
	
});

$("#open-jz").one('touchend',function(){
	$("#mask-jz").show();
	
	setTimeout(function(){
		$("#go-map").show();
	},3300);
});

$("#go-map").one('touchend',function(){
	showMap();
	$("#mask-jz").fadeOut(800);
	
	
	
});

function showMap(){
	$("#map").show();
	setTimeout(function(){
		var mySwiper = new Swiper('.swiper-container',{
			freeMode : true,
			freeModeMomentumBounce : false,
			freeModeMomentumRatio : 0.6,
			freeModeMomentumVelocityRatio : 0.5,
			resistanceRatio : 0,
		})
	},100)
	
}
