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
	// Widget background image mode
	this.backgroundImageMode = 0;						// 0=stretch 1=tile 2=repetition 3=x-repetition 4=y-repetition 5=self-adaption
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
		// Render widget size
		var widget = getObject(widgetList[tempNumber].id);
		widget.height = widgetList[tempNumber].height;
		widget.width = widgetList[tempNumber].width;
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
			image.src = widgetList[tempNumber].backgroundImage;
			// Choose render mode
			switch(widgetList[tempNumber].backgroundImageMode) {
			// Stretch mode
			case 0:
				if(image.width != 0 && image.height != 0) {
					drawInstance.drawImage(image, 0, 0, widgetList[tempNumber].width, widgetList[tempNumber].height);
				} else {
					drawInstance.drawImage(image, 0, 0, image.width,  image.height);
				}
				break;
			// Tile mode
			case 1:
				if(image.width != 0 && image.height != 0) {
					drawInstance.drawImage(image, 0, 0, image.width, image.height);
				} else {
					drawInstance.drawImage(image, 0, 0, image.width,  image.height);
				}
				break;
			// Repetition mode
			case 2:
				if(image.width != 0 && image.height != 0) {
					// Check y
					for(var numberY = 0; numberY <= widgetList[tempNumber].height; numberY += image.height) {
						// Check x
						for(var numberX = 0; numberX <= widgetList[tempNumber].width; numberX += image.width) {
							drawInstance.drawImage(image, numberX, numberY, image.width, image.height);
						}
					}
				} else {
					drawInstance.drawImage(image, 0, 0, image.width,  image.height);
				}
				break;
			// X-repetition mode
			case 3:
				if(image.width != 0 && image.height != 0) {
					// Check x
					for(var numberX = 0; numberX <= widgetList[tempNumber].width; numberX += image.width) {
						drawInstance.drawImage(image, numberX, 0, image.width, image.height);
					}
				} else {
					drawInstance.drawImage(image, 0, 0, image.width,  image.height);
				}
				break;
			// Y-repetition mode
			case 4:
				if(image.width != 0 && image.height != 0) {
					// Check y
					for(var numberY = 0; numberY <= widgetList[tempNumber].height; numberY += image.height) {
						drawInstance.drawImage(image, 0, numberY, image.width, image.height);
					}
				} else {
					drawInstance.drawImage(image, 0, 0, image.width,  image.height);
				}
				break;
			// Self-adaption mode
			case 5:
				if(image.width != 0 && image.height != 0) {
					var xProportion = image.width / widgetList[tempNumber].width;
					var yProportion = image.height / widgetList[tempNumber].height;
					var imageProportion = image.width / image.height;
					if (xProportion < yProportion) {
						drawInstance.drawImage(image, 0, 0, widgetList[tempNumber].width, widgetList[tempNumber].width / imageProportion);
					} else if (xProportion > yProportion) {
						drawInstance.drawImage(image, 0, 0, widgetList[tempNumber].height * imageProportion, widgetList[tempNumber].height);
					} else if (xProportion == yProportion) {
						drawInstance.drawImage(image, 0, 0, widgetList[tempNumber].width, widgetList[tempNumber].height);
					}
				} else {
					drawInstance.drawImage(image, 0, 0, image.width,  image.height);
				}
				break;
			}
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
/*************************************************************************
** Get object
*************************************************************************/
function getObject(objectID) {
	return document.getElementById(objectID);
}