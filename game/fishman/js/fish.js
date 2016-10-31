var FISH_SIZE = [
		null,
		{w:37,h:55, collR: 17},
		{w:64,h:78, collR: 24},
		{w:56,h:72, collR: 20},
		{w:59,h:77, collR: 22},
		{w:122,h:107, collR: 29}
	];
function Fish(type){
	this.type = type;
	this.w = FISH_SIZE[this.type].w;
	this.h = FISH_SIZE[this.type].h;
	this.collr = FISH_SIZE[this.type].collR;
	this.x = 0;
	this.y = 0;
	this.speed = 1;
	this.rotate = 0;
	this.cur = 0;
	this.move();
}
Fish.prototype.draw = function(gd){
	gd.save();
	gd.translate(this.x,this.y);
	gd.rotate(d2a(this.rotate));
	if (this.rotate<45) {
		gd.scale(-1,1);
	}
	gd.drawImage(JSON['fish'+this.type],this.w*this.cur,0,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
	gd.restore();
}
Fish.prototype.move = function(){
	var _this = this;
	setInterval(function(){
		_this.cur++;
		_this.cur%=4;
	},200)
	setInterval(function(){
		_this.x+=Math.sin(d2a(_this.rotate));
		_this.y-=Math.cos(d2a(_this.rotate));

	},16)
}
Fish.prototype.isDie = function(x1,y1){
	var a = this.x - x1;
	var b = this.y - y1;
	var c = Math.sqrt(a*a+b*b);
	if (c<this.collr) {
		return true;
	}else{
		return false;
	}
}