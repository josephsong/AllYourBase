goog.provide('allyourbase.panelviewer');
goog.provide('allyourbase.panelviewer.Panel');

goog.require('goog.dom');

goog.require('goog.ui.AnimatedZippy');
goog.require('goog.ui.Zippy');
goog.require('goog.ui.ZippyEvent');


allyourbase.panelviewer.makePanels = function(viewSize, data, panelContainer) {
	var panels = [];
	for (var i = 0; i < data.length; i++) {
		var panel = new allyourbase.panelviewer.Panel(data[i].title, data[i].description, data[i].imageName, viewSize, panelContainer);
		panels.push(panel);
		panel.makePanelDom();
	}
	return panels;
};


allyourbase.panelviewer.Panel = function(title, description, imageName, viewSize, panelContainer) {
	this.title = title;
	this.description = description;
	this.imageName = imageName
	this.parent = panelContainer;
	this.viewSize = viewSize;
};


allyourbase.panelviewer.Panel.prototype.makePanelDom = function() {
	// Create DOM structure to represent the note.
	this.headerElement = goog.dom.createDom('div', {'class': 'panel-header'}, this.title);
	
	this.image = goog.dom.createDom('img', {'src': 'http://closure.panelviewer.local/images/' + this.viewSize + '/' + this.imageName + '.jpg', 'alt': this.title, 'class':'left'} );
	
	this.panelHeadline = goog.dom.createDom('h3', null, this.title );
	this.panelText = goog.dom.createDom('p', null, this.description );
	
	this.imagePanelElement = goog.dom.createDom('div', {'class':'image-panel clearcontents'}, this.image, this.panelHeadline, this.panelText);
	
	var newPanel = goog.dom.createDom('div', {'class':'panel'}, this.headerElement, this.imagePanelElement);
	
	// Add the note's DOM structure to the document.
	goog.dom.appendChild(this.parent, newPanel);
	
	var panel = new goog.ui.AnimatedZippy(this.headerElement, this.imagePanelElement);
	
	goog.events.listen(panel, goog.ui.Zippy.Events.TOGGLE, this.onPanelToggle);
	
	return panel;
};

allyourbase.panelviewer.Panel.prototype.onPanelToggle = function(evt) {
	console.log(evt.target);
};
