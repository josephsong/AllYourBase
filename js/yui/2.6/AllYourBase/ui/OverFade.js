/**
 * @fileoverview Transition of background color on hover
 * $Id: OverFade.js,v 1.0 2009/01/30 16:20:00 jisham Exp $
 */
 
AYB.namespace("AYB.ui");

/**
 * @constructor
 */
AYB.ui.OverFade = function(properties){
	
	
	//--------------------------------------------------
	// Private Properties
	//--------------------------------------------------
		
	var Dom = YAHOO.util.Dom;
	var Event = YAHOO.util.Event;
	
	var navEls = [];
	
	function findElements() {
		navEls = Dom.getElementsBy(function(el){return true;},this.tag, this.container);
	}
	
	function attachListeners() {
		Event.addListener(navEls, "mouseover", onMouseOver, this, true);
		Event.addListener(navEls, "mouseout", onMouseOut, this, true);
	}
	
	
	//--------------------------------------------------
	// Public Properties
	//--------------------------------------------------
	
	
	this.container = 'menu';
	this.tag = 'a';
	this.linkClass = 'overfade';
	
	this.defaultColor = '#FF9900';
	this.overColor = '#FFCC00';
	this.duration = .2;
	
	//--------------------------------------------------
	// Initialization
	//--------------------------------------------------


	this.init = function(properties) {
		
		if(!properties) { var properties = {} }
	
		if(properties.container) { this.container = properties.container }
		if(properties.tag) { this.tag = properties.tag }
		if(properties.linkClass) { this.linkClass = properties.linkClass }
		if(properties.defaultColor) { this.defaultColor = properties.defaultColor }
		if(properties.overColor) { this.overColor = properties.overColor }
		if(properties.duration) { this.duration = properties.duration }
		
		findElements.call(this);
		attachListeners.call(this);
		
	}
	
	this.init(properties);
	
	
	//--------------------------------------------------
	// Private Methods
	//--------------------------------------------------
	
		
	function onMouseOver(e) {
		var attributes = { 
				backgroundColor: { to: this.overColor } 
			};
		var anim = new YAHOO.util.ColorAnim(YAHOO.util.Event.getTarget(e), attributes, this.duration);
		anim.animate();
	}
	
	function onMouseOut(e) {
		var attributes = { 
				backgroundColor: { to: this.defaultColor } 
			};
		var anim = new YAHOO.util.ColorAnim(YAHOO.util.Event.getTarget(e), attributes, this.duration);
		anim.animate();
	}
	
	
	
};

//TODO: Add Hit state


//{ defaultColor: '', overColor: '', duration: '', container: '', tag: '', linkClass: '' }
