AYB.namespace("AYB.ui.global");

AYB.ui.global.BaseBox = new Class({
    Implements: [Options, Events],
    options: {
		CLASSES: {
			applyWhenTooltip: 'basebox-tooltip'
		},
		SELECTORS: {
			autoClick: '.basebox',
			autoTooltip: '.basebox-tooltip'
		},
		IDS: {
			contentWrapper: 'basebox-wrapper',
			contentContainer: 'basebox-container',
			underlay: 'basebox-underlay'
		},
		contentWrapperStyles: {
			opacity: 0,
			zIndex: 999999
		},
		contentContainerStyles: {},
		underlayStyles: {
			backgroundColor: '#777777',
			display: 'none',
			left: 0,
			opacity: 0.5,
			position: 'fixed',
			top: 0,
			width: '100%',
			zIndex: 999998
		},
		hideDelay: 500
    },
	underlay: null,
	contentWrapper: null,
	contentContainer: null,
	autoButtons: [],
	autoTooltips: [],
	hideTimeout: null,
	
	_TooltipTrigger: false,
	
    initialize: function(options) {
        this.setOptions(options);
        this.findElements();
        this.addListeners();
        this.prepareBody();
    },

    findElements: function() {
    	this.underlay = $(this.options.IDS.underlay);
    	this.contentContainer = $(this.options.IDS.contentContainer);
    	this.autoButtons = $$(this.options.SELECTORS.autoClick);
    	this.autoTooltips = $$(this.options.SELECTORS.autoTooltip);
    },
    addListeners: function() {
    	if (this.underlay) {
    		this.underlay.removeEvents('click').addEvent('click', this.hide.bindWithEvent(this));
    	}
    	if (this.contentWrapper) {
    		this.contentWrapper.removeEvents('mouseenter');
    		this.contentWrapper.removeEvents('mouseleave');
    		this.contentWrapper.addEvent('mouseenter', this.handleBoxMouseEnter.bindWithEvent(this));
    		this.contentWrapper.addEvent('mouseleave', this.handleMouseLeave.bindWithEvent(this));
    	}
    	this.autoButtons.addEvent('click', this.handleAutoClick.bindWithEvent(this));
    	this.autoTooltips.removeEvents('mouseenter');
    	this.autoTooltips.removeEvents('mouseleave');
    	this.autoTooltips.addEvent('mouseenter', this.handleAutoMouseEnter.bindWithEvent(this));
    	this.autoTooltips.addEvent('mouseleave', this.handleMouseLeave.bindWithEvent(this));
    	window.addEvent('resize', this.setUnderlayHeight.bind(this));
    },
    prepareBody: function() {
    	$$('html, body').setStyle('height', '100%');
    },
    
    handleAutoClick: function(evt) {
    	evt.preventDefault();
		this.resetFrame();
    	this.showXhr($(evt.target).get('href'));
    },
    
    handleAutoMouseEnter: function(evt) {
    	evt.target = $(evt.target);
		this.showTooltip(evt.target.get('rel'), evt.target);
    },
    
    handleBoxMouseEnter: function(evt) {
    	this.hideTimeout = $clear(this.hideTimeout);
    },
    
    handleMouseLeave: function(evt) {
    	if (this._TooltipTrigger) {
    		this.hideTimeout = this.hide.delay(this.options.hideDelay, this);
    	}
    },
	
    showMarkup: function(markup) {
		if (!markup) { return false; }
		this.resetFrame();
		this._TooltipTrigger = false;
		
		switch ($type(markup)) {
		case 'string':
			this.contentContainer.set('html', markup);
			break;
		case 'element':
			this.contentContainer.empty();
			this.contentContainer.adopt($(markup).clone().setStyle('display', 'block'));
			break;
		}
		this.revealBox();
	},
	
	showTooltip: function(markup, triggerElement) {
		if (!markup) { return false; }
		this.resetFrame();
    	this.hideTimeout = $clear(this.hideTimeout);
		if (!triggerElement) {
			triggerElement = document.body;
		}
		triggerElement = $(triggerElement);
		this._TooltipTrigger = triggerElement;
		this.contentWrapper.addClass(this.options.CLASSES.applyWhenTooltip);
		
		this.contentContainer.set('html', markup);
		this.revealBox();
	},
	
	showXhr: function(uri) {
		new Request.HTML({
			url: uri,
			method: 'get',
			onSuccess: this.handleXhrSuccess.bind(this)
		}).send();
	},
	
	handleXhrSuccess: function(responseTree, responseElements, responseHTML) {
		if (responseHTML) {
			this.showMarkup(responseHTML);
		}
	},
	
	revealBox: function() {
		this.showUnderlay();
		this.contentWrapper.fade('in');
		this.positionContentWrapper();
	},
	
	showUnderlay: function() {
		if (!this._TooltipTrigger) {
			this.underlay.setStyles({
				'opacity': 0,
				'display': 'block'
			});
			this.setUnderlayHeight();
			this.underlay.fade(this.options.underlayStyles.opacity);
		}
	},
	setUnderlayHeight: function() {
		if (this.underlay) {
			this.underlay.setStyles({
				'height': window.getSize().y + 'px'
			});
		}
	},
	
	positionContentWrapper: function() {
		if (this._TooltipTrigger && $type(this._TooltipTrigger) == 'element') {
			this.contentWrapper.position({
				relativeTo: this._TooltipTrigger,
				position: 'bottomLeft'
			});
		} else {
			this.contentWrapper.position();
		}
	},
	
	hide: function() {
		this.underlay.fade('out');
		this.contentWrapper.fade('out');
	},
	
	resetFrame: function() {
		if (!this.contentWrapper) {
			this.underlay = new Element('div', {
				'id': this.options.IDS.underlay,
				'styles': this.options.underlayStyles
			});
			this.contentWrapper = new Element('div', {
				'id': this.options.IDS.contentWrapper,
				'styles': this.options.contentWrapperStyles
			});
			this.contentContainer = new Element('div', {
				'id': this.options.IDS.contentContainer,
				'styles': this.options.contentContainerStyles
			});
			this.underlay.inject($(document.body));
			this.contentWrapper.inject($(document.body));
			this.contentContainer.inject(this.contentWrapper);
			this.addListeners();
		}

		this.contentWrapper.removeClass(this.options.CLASSES.applyWhenTooltip);
	}
});

AYB.basebox = null;
window.addEvent('domready', function() {
    try {
        AYB.basebox = new AYB.ui.global.BaseBox();
    } catch (err) {
        console.warn('BaseBox startup error');
        console.dir(err);
    }
});
