/**
 *视觉窗口设置
 */
;(function( viewWidth ){

	if(/Android (\d+\.\d+)/.test(navigator.userAgent)){
		var version = parseFloat(RegExp.$1);
		if(version>2.3){
			var phoneScale = parseInt(window.screen.width)/viewWidth;
			document.write('<meta name="viewport" content="width='+ viewWidth +', minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', target-densitydpi=device-dpi">');
		}else{
			document.write('<meta name="viewport" content="width='+ viewWidth +', target-densitydpi=device-dpi">');
		}
	}else{
		document.write('<meta name="viewport" content="width='+ viewWidth +', user-scalable=no, target-densitydpi=device-dpi">');
	}

})( 640 );