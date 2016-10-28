function move(obj,json,options){
	function getStyle(obj,name){
		return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
	}
	// 设置默认值
	options = options || {};
	options.duration = options.duration || 3000;
	options.type = options.type || 'linear';
	
	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name]-start[name];
	}
	var count = Math.floor(options.duration/30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(options.type){
				case 'linear':
				    var a = n/count;
				    // console.log('匀速');
					var cur = start[name]+dis[name]*a;
				break;
				case 'ease-in':
					var a = n/count;
					// console.log('加速');
					var cur = start[name]+dis[name]*(a*a*a);
				break;
				case 'ease-out':
					var a = 1-n/count;
					// console.log('减速');
					var cur = start[name]+dis[name]*(1-a*a*a);
				break;
			}
			if (name=='opacity'){
				obj.style[name] = cur;
				obj.style.filter = 'alpha(opacity = '+cur*100+')';
			}else{
				obj.style[name] = cur+'px';
			}
		}				
		if(n==count) {
			clearInterval(obj.timer);
			options.complete && options.complete();
		} 
	},30)
}

