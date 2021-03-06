function Coin(type){
	this.type = type%2+1;
	this.w = 60;
	this.h = 60;
	this.x = 0;
	this.y = 0;
	this.cur = 0;
	this.move();
}
Coin.prototype.draw = function(gd){
	gd.save();
	gd.translate(this.x,this.y)
	gd.drawImage(JSON['coinAni'+this.type],0,this.cur*this.h,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
	gd.restore();
}
Coin.prototype.move = function(){
	var _this = this;
	setInterval(function(){
		_this.cur++;
		_this.cur%=10
	},100)
	setInterval(function(){
		_this.x-=(_this.x-50)/20;
		_this.y+=(600-_this.y)/20;
	},30)
}