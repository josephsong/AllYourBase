AYB.namespace('AYB.ui.expando');

$(document).ready(function(){ AYB.ui.expando.init(); });

AYB.ui.expando = {
	
	_buttons: [],
	_panels: [],
	
	CLASSES: {
		PANEL: 'panel',
		TITLE: 'title'
	},
	
	IDS: {},
	
	SELECTORS: {},
	
	init: function() {
		AYB.ui.expando.getElements();
		AYB.ui.expando.setUpPanels();
		AYB.ui.expando.attachListeners();
	},
	
	attachListeners: function() {
		AYB.ui.expando._buttons.click(function(e) {
			e.preventDefault();
			$(this).next('.' + AYB.ui.expando.CLASSES.PANEL).slideToggle('fast');
		});
	},
	
	getElements: function() {
		AYB.ui.expando._buttons = $('.' + AYB.ui.expando.CLASSES.TITLE);
		AYB.ui.expando._panels = $('.' + AYB.ui.expando.CLASSES.PANEL);
	},
	
	setUpPanels: function() {
		AYB.ui.expando._panels.hide();
	}	

	
}