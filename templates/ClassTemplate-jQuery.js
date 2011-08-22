AYB.namespace('AYB.collection');

$(document).ready(function(){ AYB.collection.init(); });

AYB.collection = {

	
	CLASSES: {},
	
	IDS: {},
	
	SELECTORS: {},
	
	init: function() {
		AYB.collection.getElements();
		AYB.collection.attachListeners();
	},
	
	attachListeners: function() {
	},
	
	getElements: function() {
	}		
	
}
