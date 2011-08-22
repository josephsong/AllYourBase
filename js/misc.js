function _getUserAgent() {
	
	var browserName;
	
	//test for MSIE x.x;
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
		// capture x.x portion and store as a number
		var ieversion = new Number(RegExp.$1);
		
		if (ieversion>=8) {
			browserName = 'IE8';
		} else if (ieversion>=7) {
			browserName = 'IE7';
		} else if (ieversion>=6) {
			browserName = 'IE6';
		} else if (ieversion>=5) {
			browserName = 'IE5';
		}
	} else {
		browserName = 'ok';
	}
	
	return browserName;
	
}