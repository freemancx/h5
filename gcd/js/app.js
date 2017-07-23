//$("body").on('touchmove', function(e) {
//	e.preventDefault();
//})

//预加载
function preloadImages(arr, stepfun, overfun) {
	var newimages = [],
		loadedimages = 0;
	var arr = (typeof arr != "object") ? [arr] : arr;

	function imageloadpost() {
		loadedimages++;
		stepfun && stepfun();
		if(loadedimages == arr.length) {
			console.log("图片已经加载完成");
			overfun && overfun();
		}
	}
	for(var i = 0; i < arr.length; i++) {
		newimages[i] = new Image();
		newimages[i].src = arr[i];
		newimages[i].onload = function() {
			imageloadpost();
		}
		newimages[i].onerror = function() {
			console.log("第" + i + "张图片加载出现问题");
			imageloadpost();
		}
	}
}


$(window).load(function() {
	$("#bgm").attr('src',$("#bgm").attr('data-src'));
	$("#bgm")[0].play();
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
	$("#music-icon").show().click(function() {
		if($(this).hasClass('pause')) {
			isPlay = true;
			$(this).removeClass('pause');
			$(this).addClass('rotateN');
			$("#bgm")[0].play();
		} else {
			isPlay = false;
			$(this).addClass('pause');
			$(this).removeClass('rotateN');
			$("#bgm")[0].pause();
		}
	});
	//音频e
	
	var imgList = [
		"img/bg1.jpg",
		"img/t1.jpg",
		"img/load_bar.jpg",
		"img/bg2.jpg",
		"img/bg5.jpg",
		"img/bg1.jpg",
		"img/bg4.jpg",
		"img/t52.png",
		"img/jz_center.jpg",
		"img/bg6.jpg",
		"img/t74.png",
		"img/t76.png",
		"img/bg8.jpg",
		"img/t21.jpg",
		"img/t22.jpg",
		"img/t23.jpg",
		"img/t31.jpg",
		"img/t32.jpg",
		"img/t41.png",
		"img/t3.png",
		"img/chuizi.png",
		"img/chuizi.png",
		"img/chuizi.png",
		"img/bianfu.png",
		"img/cloud1.png",
		"img/cloud2.png",
		"img/cloud3.png",
		"img/t51.png",
		"img/cloud1.png",
		"img/cloud3.png",
		"img/cloud2.png",
		"img/t75.png",
		"img/t71.png",
		"img/t72.png",
		"img/t81.png",
		"img/t82.png",
		"img/t83.png",
		"img/t84.png",
		"img/t85.png",
		"img/jz_top.png",
		"img/t61.png",
		"img/jz_bottom.png",
		"img/t73.png",
		"img/card1.jpg",
		"img/card2.jpg",
		"img/card3.jpg",
		"img/card4.jpg",
		"img/card5.jpg",
		"img/card6.jpg",
		"img/card7.jpg",
		"img/card8.jpg",
		"img/card9.jpg",
		"img/card0.jpg",
	];
	
	var step =  300/imgList.length;
	var loadW = 11;
	var loadOver = false;
	preloadImages(imgList, function() {
		loadW += step;
		$(".loading-txt").css('width', parseInt(loadW));
	}, function() {
		loadOver = true;
	});
	var x = 0;
	var $t1List = $(".t1 span");
	var timer = setInterval(function(){
		if( x == 14 ){
			if( loadOver ){
				clearInterval(timer);
				$(".lazyimg-div img").each(function(){
					var url = $(this).attr('data-src');
					$(this).attr('src',url);
				});
				
				$(".lazybg-div").each(function(){
					var style = $(this).attr('data-style');
					$(this).attr('style',style);
				});
				
				setTimeout(function(){
					$(".page-02").show().addClass('animated');
					
				},1400);
			}
		}else{
			$t1List.eq(x).css('display','block');
			x++;
		}
	},500);
	
//	$(".page-05").show().addClass('animated');
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
				$("#bianfubg")[0].play();
				
				setTimeout(function(){
					$(".page-03").show().addClass('animated');
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
	$("#mask-card img").attr('src','img/card'+ id +'.jpg');
	setTimeout(function(){
		$("#mask-card").show();
	},80);
	
	console.log(id);
	if( wasTansuo[id] == false ){
		wasTansuo[id] = true;
		score++;
		$("#ts-jd").css('width', 40+score*35 +'px');
		$("#jd-txt").text('探险进度：'+ score +'/10')
	}
	if( score >= 3 ){
		$("#go-renzheng").addClass('ready');
	}
	if( score >= 4 ){
		$(".page-05 .xunzhang").attr('src','img/t82.png');
	}
	if( score >= 8 ){
		$(".page-05 .xunzhang").attr('src','img/t83.png');
	}
});

var photoUrl = $("#link-photo").attr('href');
$("#go-renzheng").click(function(){
	if( $(this).hasClass('ready') ){
		$("#link-photo").attr('href',photoUrl+'?score='+score*10);
		//修改分数
		$(".page-05").show().addClass('animated');
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