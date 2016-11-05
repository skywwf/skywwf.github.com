
function SkyF(){
	this.name = '张飞';
	this.phone = 15617762086;
	this.email = '15617762086@163.com';
	this.qq = 641768249;
};

SkyF.prototype = {
	showName :function(){
		return this.name;
	},
	showPhone:function(){
		return this.phone;
	},
	showEmail:function(){
		return this.email;
	},
	showQq:function(){
		return this.qq;
	}
};
var oMe = new SkyF();
var myInfo = [
		{name:'Designer',value:oMe.showName()},
		{name:'QQ',value:oMe.showQq()},
		{name:'Phone',value:oMe.showPhone()},
		{name:'Eemail',value:oMe.showEmail()}
	]
console.table(myInfo);

$.fn.extend({
	wheelMove:function(n){
		$('.left').css('top',-n%4+'00%');
		$('.right').css('top',(n%4-3)+'00%');
		$('.side li').removeClass('active').eq(n).addClass('active');
		if (n==0) {
			clearTimeout($('#home').get(0).timer);
			$('#home').get(0).timer = setTimeout(function(){
			$('#home').css('display','block');
			$('.home_h2 h2').addClass('bounceInDown');
			$('.home_h2 p').addClass('bounceInLeft');
			},1000)
		}else{
			clearTimeout($('#home').get(0).timer);
			$('#home').css('display','none')
			$('.home_h2 h2').removeClass('bounceInDown');
			$('.home_h2 p').removeClass('bounceInLeft');
		}
		if (n==1) {
			bOk0 = true;
			$('.nav').css('opacity',0);
			$('#personal').opShow();
		}else{
			$('.nav').css('opacity',1);
			$('#personal').opHide();
		}
		if (n==2) {
			bOk0 = false;
			$('#listline').opShow();
		}else{
			$('#listline').opHide();
		}
		if (n==3) {
			$('#game_box').opShow();
		}else{
			$('#game_box').opHide();
		}
	},
	opHide:function(){
		$(this).css({'display':'none','opacity':0});
	},
	opShow:function(){
		var _this = $(this);
		_this.css('display','block');
		setTimeout(function(){
			_this.css({'opacity':1});
		},1000);
	}
});

$(function(){
	// 预加载
	var img_arr = ['bg0_1.jpg','bg0_2.jpg','bg1_1.jpg','bg1_2.jpg','1.png','2.png','3.png','4.png','5.png','132673.png','app_block.png','app_fish.png','app_tanchi.png','app_mi.png','app_pic.png','app_soul.png','bar.png','demo1.jpg','demo2.jpg','demo3.jpg','demo4.jpg','demo5.jpg','demo6.jpg','ipad.png','logo.png','nav.png'];
	var count = 0;
	for (var i = 0; i < img_arr.length; i++) {
		var oImg = new Image();
		oImg.src = 'img/'+img_arr[i];
		oImg.onload = function(){
			count++;
			$('.bar').css('width',350*count/img_arr.length)
			$('.progress').html((100*count/img_arr.length).toFixed(2)+'%')
			if (count == img_arr.length) {
				$('#img_loading').css('display','none');
				$('.container').css('display','block');
				clearTimeout($('#home').get(0).timer);
				$('#home').get(0).timer = setTimeout(function(){
				$('#home').css('display','block');
				$('.home_h2 h2').addClass('bounceInDown');
				$('.home_h2 p').addClass('bounceInLeft');
				},500)
			}
		}
		oImg.error = function(){
			alert('加载失败了');
		}
	}
	// $('#personal').css('display','none');
	var n = 0;
	bOk = false;
	var w_bOk = true;
	addWheel($(document).get(0),function(bDown){
		if (!w_bOk) {return}
			w_bOk = false;
		if (bDown) {
			n++
			if (n == 4) {n = 3;w_bOk = true;return;}
			//向下滑
		}else{
			// 向上滑
			n--
			if (n == -1) {n = 0;w_bOk = true;return;}
		}
		$(this).wheelMove(n);
	});
	$('.left').on('transitionend',function(){
		w_bOk = true;
	});
	$('.side li').click(function(){
		n = $(this).index()
		$(this).wheelMove(n);
	});
	//导航模块
	$('.nav_list').toggle(function(){
		$('.n_list ul').css('display','block');
	},function(){
		$('.n_list ul').css('display','');
	})
	$('.n_list ul li').click(function(){
		n = $(this).index()
		$(this).wheelMove(n);
	})

	// circle加事件
	$('.circle').click(function(){
		var cH = $(window).width();
		$('.l_step').removeClass('present');
		$(this).parent('.l_step').addClass('present');
		var index = $(this).index('.circle');
		$('.impress1').css('margin-left',cH/2-174*index-128);
	})
	//game模块
	var nImgW = $('#div1 img').width();
	$('#div1 img').mouseover(function(){
		$(this).css({
			width:96,
			height:96
		})
	})
	$('#div1 img').mouseout(function(){
		$(this).css({
			width:64,
			height:64
		})
	})
});


function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
};
function addWheel(obj,fn){
	function wheel(ev){
		var oEvent = ev || event;
		var bDown = true;
		bDown=oEvent.detail?oEvent.detail>0:oEvent.wheelDelta<0;
		fn && fn(bDown);
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}
	if(window.navigator.userAgent.indexOf('Firefox')!=-1){
		addEvent(obj,'DOMMouseScroll',wheel);
	}else{
		addEvent(obj,'mousewheel',wheel);
	}
};
