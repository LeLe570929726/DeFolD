/*************************************************************************
** DeFolD Porject
*************************************************************************/
/*************************************************************************
** Copyright © 2013-2015 Lambda Innovation. All rights reserved.
** 本项目版权归Lambda Innovation所有。
** http://www.li-dev.cn/
**
** This project is open-source, and it is distributed under the terms of GNU 
** General Public License.You can modify and distribute freely as long as 
** you follow the license.
** 本项目是一个开源项目，且遵循GNU通用公共授权协议。
** 在遵照该协议的情况下，您可以自由传播和修改。
** http://www.gnu.org/licenses/gpl.html
*************************************************************************/

/*************************************************************************
** Widget class
*************************************************************************/
/*************************************************************************
** Widget class's constructor
*************************************************************************/
function Widget(canvasID) {
	// Widget ID
	this.id = canvasID;
	// Widget Height
	this.height = getCanvasHeight(canvasID);
	// Widget width
	this.width = getCanvasWidth(canvasID);
	// Widget background image
	this.backgroundImage = "";
	// Widget backgournd color
	this.backgroundColor = "#000000";
	// Add list
	widgetList.push(this);
}
/*************************************************************************
** Get canvas draw object
*************************************************************************/
function getCanvasDrawObject(canvasID) {
	return document.getElementById(canvasID).getContext("2d");
}
/*************************************************************************
** Get canvas's height
*************************************************************************/
function getCanvasHeight(canvasID) {
	return  document.getElementById(canvasID).offsetHeight;
}
/*************************************************************************
** Get canvas's width
*************************************************************************/
function getCanvasWidth(canvasID) {
	return  document.getElementById(canvasID).offsetWidth;
}

/*************************************************************************
** Render 
*************************************************************************/
/*************************************************************************
** Start render loop
*************************************************************************/
function startRenderLoop() {
	// What? I put render into the clock thread:-)
	setTimeout(function () { renderLoop(); }, 1);
}
/*************************************************************************
** Render loop function
*************************************************************************/
function renderLoop() {
	// Render widgetList
	WidgetRender();
	// Looooooooooooooooop!!!!!!!!!!
	setTimeout(function () { renderLoop(); }, 1);
}
/*************************************************************************
** Widget render
*************************************************************************/
function WidgetRender() {
	// Use this var to meter
	var tempNumber;
	// Traversal widget list
	for(tempNumber in widgetList) {
		var drawInstance = getCanvasDrawObject(widgetList[tempNumber].id);
		// Render background
		if(widgetList[tempNumber].backgroundImage == "") {
			// Render background color
			// Set color
			drawInstance.fillStyle = widgetList[tempNumber].backgroundColor;
			// Draw block
			drawInstance.fillRect(0, 0, widgetList[tempNumber].width, widgetList[tempNumber].height);
		} else {
			// Render background image
			// Creat image
			var image = new Image();
			image.
		}
	}
}

/*************************************************************************
** Manager
*************************************************************************/
/*************************************************************************
** Widget list
*************************************************************************/
var widgetList = new Array();

/*************************************************************************
** General API
*************************************************************************/