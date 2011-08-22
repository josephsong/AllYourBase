AYB.namespace('AYB.ui.rotator');

$(document).ready(function(){ AYB.ui.rotator.init(); });

AYB.ui.rotator = {
	
	_panels: [],
	_buttons: [],
	_active: 0,
	_rotatorTime: 5000,
	_panelTimer: '',
	
	CLASSES: {
		NAV: 'rotator-nav',
		NAV_BTN: 'rotator-nav-btn',
		PANEL: 'rpanel',
		ACTIVE: 'active'
	},
	IDS: {
		CONTAINER: 'rotator'		
	},
	
	init: function() {
		AYB.ui.rotator.getElements();
		AYB.ui.rotator.createButtons();
		AYB.ui.rotator.setupPanels();
		AYB.ui.rotator.attachListeners();
		AYB.ui.rotator.rotatePanel();
	},
	
	getElements: function() {
		AYB.ui.rotator._panels = $('#' + AYB.ui.rotator.IDS.CONTAINER).children();
	},
	
	createButtons: function() {
		AYB.ui.rotator._rotatorNav = $('<div class="rotator-nav clearcontents"></div>');
		$('#' + AYB.ui.rotator.IDS.CONTAINER).append(AYB.ui.rotator._rotatorNav);
		
		AYB.ui.rotator._panels.each(function(index) {
			$(AYB.ui.rotator._rotatorNav).append('<a id="panel-'+ index +'" class="left"></a>');			  
		});
		
		AYB.ui.rotator._buttons = $(AYB.ui.rotator._rotatorNav).children();		
	},
	
	attachListeners: function() {
		AYB.ui.rotator._buttons.each(function(i) {
			$(this).bind('click', {index:i}, function(e) {
				AYB.ui.rotator.navigateToPanel(e);										  
			});
													   
		});
	},
	
	setupPanels: function() {
		AYB.ui.rotator._panels.each(function(index) {
			$(this).addClass(AYB.ui.rotator.CLASSES.PANEL);
			if(index != 0) {
				$(this).hide();
			}
		});
		
		AYB.ui.rotator._buttons.each(function(index) {
			if(index == 0) {
				$(AYB.ui.rotator._buttons[index]).addClass(AYB.ui.rotator.CLASSES.ACTIVE);
			}				   
		});
	},
	
	navigateToPanel: function(e) {
		clearTimeout(AYB.ui.rotator._panelTimer);
		
		AYB.ui.rotator.hidePanel();
		AYB.ui.rotator._active = e.data.index;
		AYB.ui.rotator.showPanel();
	},
	
	hidePanel: function() {
		$(AYB.ui.rotator._panels[AYB.ui.rotator._active]).fadeOut('fast');
		$(AYB.ui.rotator._buttons[AYB.ui.rotator._active]).removeClass('active');
	},
	
	showPanel: function() {
		$(AYB.ui.rotator._panels[AYB.ui.rotator._active]).fadeIn('fast');
		$(AYB.ui.rotator._buttons[AYB.ui.rotator._active]).addClass('active');
	},
	
	rotatePanel: function() {
		AYB.ui.rotator._panelTimer = setTimeout(function() {
								   
			AYB.ui.rotator.hidePanel();
			
			if(AYB.ui.rotator._active + 1 != AYB.ui.rotator._panels.length) {
				AYB.ui.rotator._active++;
			} else {
				AYB.ui.rotator._active = 0;	
			}
			
			AYB.ui.rotator.showPanel();
			
			AYB.ui.rotator.rotatePanel();
			
		}, AYB.ui.rotator._rotatorTime);
	}
	
}