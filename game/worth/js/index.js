(function(win,doc){
	function change(){
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*20+'px';	
	}	
	change();
	win.addEventListener('resize',change,false);
})(window,document);
window.onload = function(){
	var oUl = document.querySelector('.bg_list');
	var aLi = oUl.children;
	var oOl = document.querySelector('.point_list');
	var aBtn = oOl.children;
	var len = aLi.length;
	var oC = aLi[0].offsetWidth;
	var bOk = true;
	var x = -oC;
	var downX = 0;
	var upX = 0;
	var count = 1;
	var timer = null;
	oUl.addEventListener('touchstart',function(ev){
		if (!bOk) {
			timer = setTimeout(function(){
				bOk = true;
			},300)
			return
		}
			bOk = false;
		oUl.style.WebkitTransition = 'none';
		downX = ev.targetTouches[0].clientX
		var disX = downX-x;
		var id = ev.targetTouches[0].identifier;
		document.addEventListener('touchmove',fnmove,false);
		document.addEventListener('touchend',fnend,false);
		function fnmove(ev){
			if (id == ev.targetTouches[0].identifier) {
				x = ev.targetTouches[0].clientX-disX;
				oUl.style.WebkitTransform = 'translate3d('+x+'px,0,0)';
			}
		}
		function fnend(ev){
			if (id == ev.changedTouches[0].identifier) {
				bOk =  false;
				upX = ev.changedTouches[0].clientX;
				document.removeEventListener('touchmove',fnmove,false);
				document.removeEventListener('touchend',fnend,false);
				var mx = downX - upX
				if (Math.abs(mx)>50) {
					if (downX>upX) {
						count++;
					}else{
						count--;
					}
				}
				for (var i = 0; i < aBtn.length; i++) {
					aBtn[i].className =  '';
				}
				if (count == 0) {
					aBtn[len-3].className = 'active';
				}else{
					aBtn[(count-1)%5].className = 'active';
				}
				
				x = -count*oC;
				oUl.style.WebkitTransition = '0.3s all ease';
				oUl.style.WebkitTransform = 'translate3d('+x+'px,0,0)';
			}
		}
		ev.preventDefault();
	},false)
	oUl.addEventListener('transitionend',function(){
		bOk = true;
		if (count == len-1) {
			count =1;
			x = -oC;
		}
		if (count == 0) {
			count = len-2;
			x = -oC*count;
		}
		oUl.style.WebkitTransition = 'none';
		oUl.style.WebkitTransform = 'translate3d('+x+'px,0,0)';
	},false)
} 