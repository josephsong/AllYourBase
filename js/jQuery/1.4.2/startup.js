//tell the page javascript is ok
$(document).ready(function() {
	$("body").removeClass("nojs");
});

// So IE doesn't throw error
if (!console) {
	var console = {
		log: function(){},
		dir: function(){},
		warn: function(){},
		info: function(){}
	};
}