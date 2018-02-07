;(function(){
	var os=window.os||{};

	init();
	
	function init(){
		window_resize_orientation();//一进入页面判断是否横屏
		if(os.ios) $(window).on('resize',window_resize_orientation);
		else $(window).on('resize',window_orientation);
	}//end func
	
	//横屏提示
	function window_resize_orientation(e){
		if($(window).width()>$(window).height()) orientationHandler('landscape');
		else orientationHandler('portrait');
	}//end func
	
	function window_orientation(e) {
		if (window.orientation == 90 || window.orientation == -90) orientationHandler('landscape');
		else if (window.orientation == 0 || window.orientation == 180) orientationHandler('portrait');
	}//end if
	
	function orientationHandler(orientation){
		//翻转提示浮层
		var turnBox=$('#turnBox');
		if (orientation=='landscape') {
			os.orientation = 'landscape';		
			if(turnBox.length==0) turnBox=$('<aside class="turnBox" id="turnBox"><img src="img/turn.png" class="turn"><p>请将手机调至竖屏状态，获得最佳浏览体验！</p></aside>').appendTo($('body'));
		}//end if
		else if (orientation=='portrait'){
			os.orientation='portrait';
			if(turnBox.length>0) turnBox.remove();
		}//edn else
	}//end func

})();