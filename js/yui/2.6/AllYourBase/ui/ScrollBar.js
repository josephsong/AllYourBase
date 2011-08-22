/**
 * @fileoverview Custom Scrollbars.
 * $Id: ScrollBar.js,v 1.0 2009/01/30 16:20:00 jisham Exp $
 */
 
AYB.namespace("AYB.ui");

/**
 * @constructor
 */
AYB.ui.ScrollBar = function(properties){
	
	
	//--------------------------------------------------
	// Private Properties
	//--------------------------------------------------
	
	var Dom = YAHOO.util.Dom;
	var Event = YAHOO.util.Event;
	
	var scrollbar = null;
	var scroller = null;
	var scrollContent = null;
	var contentOffsetHeight = null;
	var contentScrollHeight = null;
	var visPercent = null;
	var scrollbarHeight = null;
	var scrollerHeight = null;
	var scrollerHandle = null;
	var origYPosScroller = null;
		
	function setupScrollBar() {
		scrollbar = Dom.getElementsByClassName(this.scrollbarClass, 'div', this.rootNodeId)[0];
		scroller = Dom.getElementsByClassName(this.scrollerClass, 'div', this.rootNodeId)[0];
		scrollContent = Dom.getElementsByClassName(this.scrollContentClass, 'div', this.rootNodeId)[0];
	
		contentOffsetHeight = scrollContent.offsetHeight;
		contentScrollHeight = scrollContent.scrollHeight;
	
		visPercent = contentOffsetHeight / contentScrollHeight;
	
		scrollbarHeight = Dom.getElementsByClassName(this.scrollbarClass, 'div', this.rootNodeId)[0].offsetHeight;
		scrollerHeight = scrollbarHeight * visPercent;
	
		Dom.setStyle(scroller, 'height', scrollerHeight + 'px');
		
		scrollerHandle = new YAHOO.util.DD(scroller);
		getScrollConstraint();
		
		origYPosScroller = Dom.getY(scroller);
	}
	
	function attachListeners() {
		Event.addListener(scrollContent, "DOMMouseScroll", wheel, this, true);
		Event.addListener(scrollContent, "mousewheel", wheel, this, true);
		
		Event.addListener(scrollbar, "DOMMouseScroll", wheel, this, true);
		Event.addListener(scrollbar, "mousewheel", wheel, this, true);
		
		Event.addListener(window, 'resize', function() { getScrollConstraint(); }, this, true);
	}
	
	
	//--------------------------------------------------
	// Public Properties
	//--------------------------------------------------
	
	this.rootNodeId = '';
	this.scrollContainerClass = 'scroll_container';
	this.scrollContentClass = 'scroll_content';
	this.scrollbarClass = 'scrollbar';
	this.scrollerClass = 'scroller';
	
	//--------------------------------------------------
	// Initialization
	//--------------------------------------------------


	this.init = function(properties) {
		if(!properties) { var properties = {} }
		
		if(properties.rootNodeId) { this.rootNodeId = properties.rootNodeId }
		
		setupScrollBar.call(this);
		attachListeners.call(this);
	}
	
	this.init(properties)
	
	//--------------------------------------------------
	// Private Methods
	//--------------------------------------------------
	
	/* 
	 * description of privateMethod
	 * @param {object} obj description of obj argument
	 */
	 
	function getScrollConstraint() {
	
		//Get the top, right, bottom and left positions
		var scrollRegion = Dom.getRegion(scrollbar);
		
		//Get the element we are working on
		var el = scrollerHandle.getEl();
		
		//Get the xy position of it
		var y = Dom.getY(el);
		
		//Get the width and height
		var height = parseInt(Dom.getStyle(el, 'height'), 10);
		
		//Set top to y minus top
		var top = y - scrollRegion.top;
		
		//Set bottom to bottom minus y minus height
		var bottom = scrollRegion.bottom - y - height;
		
		//Set the constraints based on the above calculations
		scrollerHandle.setXConstraint(0, 0);
		scrollerHandle.setYConstraint(top, bottom);
	}
	
	scrollerHandle.onDrag = function(e) {
		var currentYPosScroller = Dom.getY(scroller);
		var scrollPosition = currentYPosScroller - origYPosScroller;
		var yPosContent = scrollPosition / visPercent;
		scrollContent.scrollTop = yPosContent;
	}
	
	
	//Start Mouse Wheel
	//From http://adomas.org/javascript-mouse-wheel/
	//Scroll Wheel Info http://www.quirksmode.org/dom/events/scroll.html
	function handleWheel(delta) {
		if(delta < 0) {
			scrollUp();
		} else {
			scrollDown();
		}
	}
	
	function wheel(event){
		var delta = 0;
		if(!event) {
			event = window.event;
		}
		if(event.wheelDelta) {
			delta = event.wheelDelta/120; 
			if(window.opera) {
				delta = -delta;
			}
		} else if(event.detail) {
			delta = -event.detail/3;
		}
		if(delta) {
			handleWheel(delta);
		}
		if(event.preventDefault) {
			event.preventDefault();
			event.returnValue = false;
		}
	}
	//End Mouse Wheel
	
	function scrollUp() {
		scrollContent.scrollTop += 15;
		scrollerUp();
	}
	function scrollDown() {
		scrollContent.scrollTop -= 15;
		scrollerDown();
	}
	
	function scrollerUp() {
		var scrollerMove = scrollContent.scrollTop * visPercent;
		Dom.setY(scroller, origYPosScroller + scrollerMove);
	}
	function scrollerDown() {
		var scrollerMove = scrollContent.scrollTop * visPercent;
		Dom.setY(scroller, origYPosScroller + scrollerMove);
	}
	
	
};

//{ rootNodeId: '' }


