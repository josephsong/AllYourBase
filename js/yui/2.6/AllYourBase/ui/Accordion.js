/**
 * @fileoverview Accordion Menu.
 * $Id: Accordion.js,v 1.0 2009/01/30 16:20:00 jisham Exp $
 */
 
AYB.namespace("AYB.ui");

/**
 * @constructor
 */
AYB.ui.Accordion = function(properties){
	
	
	//--------------------------------------------------
	// Private Properties
	//--------------------------------------------------
	
	var Dom = YAHOO.util.Dom;
	var Event = YAHOO.util.Event;
	
	var accordionListItems = [];
	var accordionButtons = [];
	var currentOpenItem = null;
	var currentOpenItems = [];
	var toggle = null;
	
	
	
	function findAccordionButtons() {
		accordionButtons = Dom.getElementsByClassName(this.toggleClass, 'a', this.rootNodeId);	
	}
	
	function attachListeners() {
		Event.addListener(accordionButtons, "click", doAccordion, this, true);
	}
	
	
	//--------------------------------------------------
	// Public Properties
	//--------------------------------------------------
	
	this.rootNodeId = '';
	this.accordionClass = 'accordion';
	this.listItemClass = 'list_item';
	this.toggleClass = 'toggle';
	this.nestedItemClass = 'nested_item';
	
	this.closed = 'closed';
	this.closedHeight = 0;
	//this.toggle = true;	
	
	this.duration = .2;
	
	//--------------------------------------------------
	// Initialization
	//--------------------------------------------------


	this.init = function(properties) {
		
		if(!properties) { var properties = {} }
		
		if(properties.rootNodeId) { this.rootNodeId = properties.rootNodeId }
		if(properties.accordionClass) { this.accordionClass = properties.accordionClass }
		if(properties.listItemClass) { this.listItemClass = properties.listItemClass }
		if(properties.toggleClass) { this.toggleClass = properties.toggleClass }
		if(properties.toggle == 'false') {
			toggle = Boolean(false);
		} else {
			toggle = Boolean(true);
		}
		if(properties.nestedItemClass) { this.nestedItemClass = properties.nestedItemClass }
		
		if(properties.closedHeight) { this.closedHeight = properties.closedHeight }
		if(properties.duration) { this.duration = properties.duration }
		
		findAccordionButtons.call(this);
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
	 
	function doAccordion(e) {
		
		var el;
		var parent;
		var nestedItem;
		
		// prevent the default action
		Event.preventDefault(e);
				
		// get references to the elements we need
		parent = Dom.getAncestorByClassName(Event.getTarget(e), this.listItemClass) 
		nestedItem = Dom.getElementsByClassName(this.nestedItemClass, '', parent);
		
		openNestedItem(nestedItem[0]);
		
	}
	
	function openNestedItem(node) {
		
		var animOpen;
		var attributesOpen;
		
		var index = currentOpenItems.indexOf(node);
		
		if (index > -1 && toggle == false) {
			closeNestedItem(node);
		} else if (node == currentOpenItem && toggle == true) {
			closeNestedItem(node);
		} else {
			//close any previously opened menu
			if (currentOpenItem != null && toggle == true) { closeNestedItem(node); }
			
			//set the currentOpenItem
			currentOpenItem = node;
			currentOpenItems.push(node);
			
			// open the submenu
			attributesOpen = {height: {to: node.scrollHeight}};
			
			animOpen = new YAHOO.util.Anim(node, attributesOpen, .3);
			animOpen.method = YAHOO.util.Easing.easeOut;
			animOpen.animate();
						
		}
		
	}
	
	function closeNestedItem(node) {
		
		var animClose;
		var attributesClose;
		
		// close the submenu
		attributesClose = {height: {to: 0}};
		
		if (toggle == false) {
			animClose = new YAHOO.util.Anim(node, attributesClose, .3);
		}
		if (toggle == true) {
			animClose = new YAHOO.util.Anim(currentOpenItem, attributesClose, .3);	
		}
		animClose.method = YAHOO.util.Easing.easeOut;
		animClose.animate();
		
		currentOpenItem = null;

		var index = currentOpenItems.indexOf(node);
		currentOpenItems.splice(index, 1);
			
	}
	
	
	
};

//{ rootNodeId: '', accordionClass: '', listItemClass: '', toggleClass: '', nestedItemClass: '', closedHeight: '', duration: '', toggle: '' }


