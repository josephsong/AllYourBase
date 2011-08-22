/**
 * @fileoverview Brief description of ClassName
 * $Id: classTemplate.js,v 1.2 2008/07/16 22:20:47 jsong Exp $
 */
 
YAHOO.namespace("NAMEITHERE.division");

/**
 * @constructor
 */
NAMEITHERE.division.ClassName = function(){
	
	
	//--------------------------------------------------
	// Private Properties
	//--------------------------------------------------
	
	/* description of privateProp1 */
	var privateProp1 = "value";
	
	
	
	//--------------------------------------------------
	// Public Properties
	//--------------------------------------------------
	
	/** description of publicProp1 */
	this.publicProp1 = {};
	
	
	
	//--------------------------------------------------
	// Initialization
	//--------------------------------------------------
	
	this.init = function(){
		
	}
	
	
	//--------------------------------------------------
	// Private Methods
	//--------------------------------------------------
	
	/* 
	 * description of privateMethod
	 * @param {Object} obj description of obj argument
	 */
	function privateMethod(obj) {
		
		alert("Hey! This is private!");
		
	}
	

	
	//--------------------------------------------------
	// Privileged Methods
	//--------------------------------------------------
	
	/**
	 * Description of privilegedMethod
	 * @param {Object} obj description of obj argument
	 */
	this.privilegedMethod = function(obj) {
		
		alert("I know secrets and have common sense. I am privileged.");
		
	}
	
	
	
};


	//--------------------------------------------------
	// Public Methods
	//--------------------------------------------------



/**
 * description of publicMethod
 */
OCO.division.ClassName.prototype.publicMethod = function() {
	
	alert("How can I help you, stranger?");
	
	
}


