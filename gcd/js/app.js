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
	
	$(".page-03").show().addClass('animated');
//	showMap();
	
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
	$("#juanzhou").fadeOut(800);
	$("#rule").show();
	
	$("#rule").on('touchend',function(e){
		e.preventDefault();
		showMap();
		$("#mask-jz").fadeOut(800);
	});
});

function showMap(){
	$("#map").show();
	setTimeout(function(){
//		
	},100);
}

var jd = document.getElementById("jd");
var wd = document.getElementById("wd");
$("#map").scroll(function(e){
	var sl = $("#map").scrollLeft();
	
	jd.innerText = parseInt( sl/8 + 20 ) +'°'+ (sl/13).toFixed(4); 
	wd.innerText = parseInt( sl/17 + 12 ) +'°'+ (sl/27).toFixed(4);
});

var wasTansuo = [];
for (var i=0;i<10;i++) {
	wasTansuo[i] = false;
}
var score = 0;
$(".zuobiao").click(function(){
	var id = parseInt( $(this).attr('id').charAt(2) );
	$("#mask-card img").attr('src','http://7xketu.com1.z0.glb.clouddn.com/gcdcard'+ id +'.jpg');
	setTimeout(function(){
		$("#mask-card").show();
	},80);
	
	console.log(id);
	if( wasTansuo[id] == false ){
		wasTansuo[id] = true;
		score++;
		$("#ts-jd").css('width', 40+score*35 +'px')
	}
	if( score >= 3 ){
		$("#go-renzheng").addClass('ready');
	}
});

$("#go-renzheng").click(function(){
	if( $(this).hasClass('ready') ){
		$(".page-05").show();
	}else{
		$("#mask-jz").show();
	}
});
$("#mask-card").on('touchend',function(e){
	e.preventDefault();
	$(this).hide();
//	setTimeout(function(){
//		
//	})
	
});