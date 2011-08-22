AYB.namespace('AYB.util.externalInterface');

$(document).ready(function(){ AYB.util.externalInterface.init(); });

AYB.util.externalInterface = {


	navElements: [],
	active: null,
	flashMovie: null,
	flashMovieSrc: '../../swf/ExternalInterfaceExample.swf',
	flashMovieWidth: 400,
	flashMovieHeight: 230,
	errorHref: null,
	
	CLASSES: {
		current: 'current-item',
	},
	
	IDS: {
		flashMovie: 'flash-content',
		nav: 'main-nav'
	},
	
	SELECTORS: {
		flashMovieContainer: '#flash-content',
		flashMovie: '#flash-content object',
		navContainer: '#main-nav',
		navEl: '#main-nav a'
	},
	
	init: function() {
		
		AYB.util.externalInterface.embedFlash();
		AYB.util.externalInterface.getElements();
		AYB.util.externalInterface.attachListeners();
		AYB.util.externalInterface.initHistory();
		
	},
	
	initHistory: function() {
		
		$.address.init(function(event) {
			//console.log('address.init');
			//console.dir(event);
		}).change(function(event) {
			//console.log('address.change');
			//console.dir(event);
			
			var href;
			
			if(event.path == '/') {
				href = 'button-one.html';
			} else {
				href = event.path.replace(/^\//, '');	
			}
			
			if(href) {
				AYB.util.externalInterface.handleHistoryChange( href );
			}
			
		}).internalChange(function(event) {
			//console.log('address.internalChange');
			//console.dir(event);
		}).externalChange(function(event) {
			//console.log('address.externalChange');
			//console.dir(event);
		}).history(true);
		
	},
	
	swfLoadComplete: function() {
		if(AYB.util.externalInterface.errorHref) {
			AYB.util.externalInterface.handleHistoryChange( AYB.util.externalInterface.errorHref );
		}
	},
	
	embedFlash: function() {
		
		AYB.util.externalInterface.flashMovie = $.flash.create(
			{
				swf: AYB.util.externalInterface.flashMovieSrc,
				width: AYB.util.externalInterface.flashMovieWidth,
				height: AYB.util.externalInterface.flashMovieHeight
			}
		);
		
		$(AYB.util.externalInterface.SELECTORS.flashMovieContainer).html(AYB.util.externalInterface.flashMovie);

	},
	
	attachListeners: function() {
		
		$(AYB.util.externalInterface.navElements).click(AYB.util.externalInterface.handleClick);
		
	},
	
	getElements: function() {
		
		AYB.util.externalInterface.navElements = $(AYB.util.externalInterface.SELECTORS.navEl);
		
	},
	
	handleClick: function(e) {
		
		e.preventDefault();
		var href = $(e.currentTarget).attr('href');
		
		$.address.value(href);

	},
	
	handleHistoryChange: function(href) {
		
		var index;
		
		AYB.util.externalInterface.navElements.each(function(i) {
			if ($(this).attr('href') == href) {
				index = i;
			}

		});
		
		try { 
			
			AYB.util.externalInterface.flashMovie.toFlash(href,index);
			AYB.util.externalInterface.setActive(href);
		
		}
		catch(err) {

			AYB.util.externalInterface.errorHref = href;
			
		}
				
	},
	
	handleFlashClick: function(href) {
		
		$.address.value(href);
		
	},
	
	setActive: function(href) {
		
		if(AYB.util.externalInterface.active) {
			AYB.util.externalInterface.active.removeClass(AYB.util.externalInterface.CLASSES.current);
		}
		
		AYB.util.externalInterface.active = $(AYB.util.externalInterface.navElements).filter('[href=' + href + ']');
		AYB.util.externalInterface.active.addClass(AYB.util.externalInterface.CLASSES.current);
		
	}
	
	
}
