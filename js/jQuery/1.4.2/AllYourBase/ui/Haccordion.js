AYB.namespace('AYB.ui.haccordion');

$(document).ready(function(){ AYB.ui.haccordion.init(); });

AYB.ui.haccordion = {
	
	_panels: [],
	_buttons: [],
	_infoPanels: [],
	_active: 'start',
	_totalPanels: null,
	_closedWidth: null,
	_defaultWidth: null,
	_openWidth: 50,
	_animationSpeed: 250,
	_widthUnits: '%',
	
	CLASSES: {
		BTN: 'haccordion-button',
		PANEL: 'haccordion-panel',
		ACTIVE: 'active',
		INFOPANEL: 'haccordion-info'
	},
	IDS: {
		CONTAINER: 'haccordion-container'
	},
	
	init: function() {
		
		AYB.ui.haccordion.getElements();
		AYB.ui.haccordion.setUp();
		AYB.ui.haccordion.attachListeners();
		
	},
	
	getElements: function() {
		
		AYB.ui.haccordion._panels = $('#' + AYB.ui.haccordion.IDS.CONTAINER + ' li');
		AYB.ui.haccordion._buttons = $('a.' + AYB.ui.haccordion.CLASSES.BTN);
		AYB.ui.haccordion._infoPanels = $('div.' + AYB.ui.haccordion.CLASSES.INFOPANEL);
		AYB.ui.haccordion._totalPanels = AYB.ui.haccordion._panels.length;
		
	},
	
	attachListeners: function() {
		
		AYB.ui.haccordion._buttons.each(function(i) {
			$(this).bind('click', {index:i}, function(e) {
				AYB.ui.haccordion.doPanel(e);										  
			});
													   
		});
		
	},
	
	setUp: function() {
		
		AYB.ui.haccordion._defaultWidth = 100 / AYB.ui.haccordion._totalPanels;
		AYB.ui.haccordion._closedWidth = (100 - AYB.ui.haccordion._openWidth) / (AYB.ui.haccordion._totalPanels - 1);
		$(AYB.ui.haccordion._infoPanels).hide();
		
	},
	
	doPanel: function(e) {
		
		if(e.data.index != AYB.ui.haccordion._active) {
			e.preventDefault();
		}
		
		var selected = e.data.index;
		
		if(selected != AYB.ui.haccordion._active) {
			
			AYB.ui.haccordion.hidePanel(selected);
			AYB.ui.haccordion._active = selected;
			AYB.ui.haccordion.showPanel();
			
		}
	},
	
	hidePanel: function(selected) {
		if(AYB.ui.haccordion._active == 'start') {
			
			$(AYB.ui.haccordion._panels).each(function(i) {
				if(i != selected) {
					$(this).animate({
						width: AYB.ui.haccordion._closedWidth + AYB.ui.haccordion._widthUnits						  
					},AYB.ui.haccordion._animationSpeed);
				}
			});
			
		} else {
			
			AYB.ui.haccordion.hideInfoPanel();
			
			$(AYB.ui.haccordion._panels[AYB.ui.haccordion._active]).animate({
				width: AYB.ui.haccordion._closedWidth + AYB.ui.haccordion._widthUnits
			}, AYB.ui.haccordion._animationSpeed);
			
		}
	},
	
	showPanel: function() {
		
		$(AYB.ui.haccordion._panels[AYB.ui.haccordion._active]).animate({
			width: AYB.ui.haccordion._openWidth + AYB.ui.haccordion._widthUnits
		}, AYB.ui.haccordion._animationSpeed, AYB.ui.haccordion.showInfoPanel);
		
	},
	
	hideInfoPanel: function() {
		
		$(AYB.ui.haccordion._infoPanels[AYB.ui.haccordion._active]).fadeOut(500);
		
	},
	
	showInfoPanel: function() {
		
		var currentPanel = $(AYB.ui.haccordion._infoPanels[AYB.ui.haccordion._active]);
		
		currentPanel.css('width',currentPanel.innerWidth());
		currentPanel.fadeIn(500);
		
	}
	
}