'use strict';
$(function(){
	//主要内容图片选项卡
	$('#spot li').mouseover(function(){
		$('#bgmap li').attr('class','bg0 hddn').eq($(this).index()).attr('class','bg'+$(this).index()+' dlk');
		$('#spot li').removeClass('active').eq($(this).index()).addClass('active');
	});
	//职业角色图片选项卡
	$('#worder-list li').mouseover(function(){
		$('#worder-list1 li').addClass('hddn').eq($(this).index()).removeClass('hddn');
		$('#worder-list li').removeClass('active').eq($(this).index()).addClass('active');
	});
	
	// 导航栏下拉信息
	$('.bdr1').hover(function(){
		$('.service').eq($(this).index('.bdr1')).show();
	},function(){
		$('.service').eq($(this).index('.bdr1')).hide();
	});

	//新闻公告媒体
	$('.news_title a').mouseover(function(){
		$('.news_title a').removeClass('active').eq($(this).index('.news_title a')).addClass('active');
	});

	//玩家交流
	$('#gamer_words .one .wjone').mouseover(function(){
		$('#gamer_words .one .wjone').removeClass('active').eq($(this).index('#gamer_words .one .wjone')).addClass('active');
	});
	$('#gamer_column .one .wjone').mouseover(function(){
		$('#gamer_column .one .wjone').removeClass('active').eq($(this).index('#gamer_column .one .wjone')).addClass('active');
	});
	$('#view_column .one .wjone').mouseover(function(){
		$('#view_column .one .wjone').removeClass('active').eq($(this).index('#view_column .one .wjone')).addClass('active');
	});

	//直接用angular保存img的src时 会有一个报错，初步估计为系统加载页面时{{iem}}值还没传到src里面，所以系统会找不到src的地址，产生报错，下面为解决办法，页面加载完后再赋值src;
	$('.media_list img').each(function(index, el) {
		$(el).attr('src',$(el).attr('_src'));
	});

	$('.media_co').scroll(function(event) {
		alert(1);
	});

	//小滚动条
});
		
	
// angular部分
var app = angular.module('app',[],[
	'$controllerProvider',
	'$compileProvider',
	function(control,compile){
		control.register('myCtrl',['$scope','$http',function($scope,$http){
			// 所有数据进行一次ajax,然后把里面的数据全部取出分别存起来 --->减少ajax请求次数。
			$http.get('nvtxt.txt').success(function(json){
				$scope.nvData = json.nv;
				$scope.showData = json.comment;
				$scope.commentData = json.comment;
				$scope.newsData = json.news;
				$scope.noticeData = json.notice;
				$scope.mediaData = json.media;
			})
			// n 为事件发生时 该对象的下标；
			$scope.over = function(n){
				$scope.n = n;
			}
			//判断显示隐藏，用函数show的返回值 n当前元素的下标
			$scope.show = function(n){
				if ($scope.n == n ) {
					return 0;
				}else{
					return 1;
				}
			}

			//当鼠标滑入哪个列表时对应赋值给showData数据
			$scope.comment = function(){
				$scope.showData = $scope.commentData;
			}
			$scope.news = function(){
				$scope.showData = $scope.newsData;
			}
			$scope.notice = function(){
				$scope.showData = $scope.noticeData;
			}
			$scope.media = function(){
				$scope.showData = $scope.mediaData;
			}

			//把ng-include的值设置成一个变量content和content1 通过改变include的值设置成一个变量content和content1的值来改变页面显示
			$scope.content = 'a0.html';
			$scope.content1 = 'a1.html';

			// 如果通过angular循环出来不同的img 要注意不能直接改，要进行懒加载。
			$scope.media_list = ["img/media1.png","img/media2.png","img/media3.png","img/media4.png"];
			$scope.media_mv = ["img/media3.png","img/media4.png","img/media1.png","img/media2.png"];
			$scope.media_img = ["img/media1.png","img/media2.png","img/media3.png","img/media4.png"];
		}])
}])

