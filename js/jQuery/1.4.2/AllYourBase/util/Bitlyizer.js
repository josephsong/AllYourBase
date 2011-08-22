AYB.namespace('AYB.util.bitlyizer');

$(document).ready(function(){ AYB.util.bitlyizer.init(); });

AYB.util.bitlyizer = {

	apiKey: 'R_0bcc31e00d743678c64a679b4c1fe20b',
	loginName: 'allyourbase',
	url: 'http://api.bit.ly/v3/shorten',
	longUrl: '',
	bitlyForm: '',
	resultContainer: '',
	counter: 0,
	
	IDS: {
		bitlyForm: 'bitly-example',
		longUrlField: 'long-url',
		resultContainer: 'result-container',
		loadingGraphic: 'loading-img'
	},
	
	init: function() {
		AYB.util.bitlyizer.getElements();
		AYB.util.bitlyizer.attachListeners();
	},
	
	attachListeners: function() {
		AYB.util.bitlyizer.bitlyForm.submit(AYB.util.bitlyizer.getBitly);
	},
	
	getElements: function() {
		AYB.util.bitlyizer.bitlyForm = $('#' + AYB.util.bitlyizer.IDS.bitlyForm);
		AYB.util.bitlyizer.resultContainer = $('#' + AYB.util.bitlyizer.IDS.resultContainer);
	},
	
	getBitly: function(e) {
		e.preventDefault();
				
		AYB.util.bitlyizer.longUrl = $($(e.currentTarget).find('#' + AYB.util.bitlyizer.IDS.longUrlField)).attr('value');
		
		var getUrl = AYB.util.bitlyizer.shortenUrl();
		
		AYB.util.bitlyizer.showLoader();
		
		$.ajax({
		  url: getUrl,
		  dataType: 'jsonp',
		  success: function(data) { AYB.util.bitlyizer.result(data); }
		});
	},
	
	shortenUrl: function() {
		
		var qLogin = '?login=' + AYB.util.bitlyizer.loginName;
		var qApiKey = '&apiKey=' + AYB.util.bitlyizer.apiKey;
		var qLongUrl = '&longUrl=' + encodeURIComponent(AYB.util.bitlyizer.longUrl);
		
		var requestUrl = AYB.util.bitlyizer.url + qLogin + qApiKey + qLongUrl;
		
		return requestUrl;
		
	},
	
	showLoader: function() {
		$('#' + AYB.util.bitlyizer.IDS.loadingGraphic).stop(true,true).fadeIn('fast');
	},
	
	hideLoader: function() {
		$('#' + AYB.util.bitlyizer.IDS.loadingGraphic).stop(true,true).fadeOut('fast');
	},
	
	result: function(data) {
		
		AYB.util.bitlyizer.hideLoader();
		
		if(data.status_code == '200') {
			AYB.util.bitlyizer.resultContainer.append('<p id="result-' + AYB.util.bitlyizer.counter + '" class="success" style="display:none;"><strong>Shortened URL:</strong> <a href="' + data.data.url + '" target="_blank">' + data.data.url + '</a> (' + AYB.util.bitlyizer.longUrl + ')</p>');
			$('#result-' + AYB.util.bitlyizer.counter).fadeIn();
			AYB.util.bitlyizer.longUrl = '';
			AYB.util.bitlyizer.counter += 1;
		} else {
			AYB.util.bitlyizer.resultContainer.append('<p id="result-' + AYB.util.bitlyizer.counter + '" class="error" style="display:none;"><strong>Error Shortening URL:</strong> ' + AYB.util.bitlyizer.longUrl + '</p>');
			$('#result-' + AYB.util.bitlyizer.counter).fadeIn();
			AYB.util.bitlyizer.longUrl = '';
			AYB.util.bitlyizer.counter += 1;
		}
		
	}
	
}