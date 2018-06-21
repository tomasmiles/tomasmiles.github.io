var canvas = document.getElementById('canvas');
var graphicsContext = canvas.getContext('2d');

var fontSize = 12;
var fontFamily = "serif";
setFont();

//Work out how many grid units fit into the canvas.
//The margin variables below are for either side of the grid, so remainder/2
var gridUnit = 20;
var horizontalMargin = 0;
var verticalMargin = 0;
var gridWidth = 0;
var gridHeight = 0;

function draw() {
	graphicsContext.fillStyle = "#000000";
	graphicsContext.fillRect(0, 0, canvas.width, canvas.height);
	graphicsContext.strokeStyle = "#FFFFFF";
	graphicsContext.strokeRect(horizontalMargin, verticalMargin, canvas.width-horizontalMargin*2, canvas.height-verticalMargin*2);
	//is in gui.js
	drawGui(getGrid());
}

function resize() {
	canvas.width =  window.innerWidth;
	canvas.height = window.innerHeight;
	setFontSize(canvas.width/50);
	setFont();
	calculateMargins();
	calculateGridSize();
	console.log(getGrid());
}

function calculateMargins() {
	horizontalMargin = (canvas.width%gridUnit)/2;
	verticalMargin = (canvas.height%gridUnit)/2;
}

function calculateGridSize() {
	gridWidth = (canvas.width-horizontalMargin*2)/gridUnit;
	gridHeight = (canvas.height-verticalMargin*2)/gridUnit;
}

function getGrid() {
	var grid = new Object();
	grid.gridWidth = gridWidth;
	grid.gridHeight = gridHeight;
	grid.width = gridWidth*gridUnit;
	grid.height = gridHeight*gridUnit;
	grid.x = horizontalMargin;
	grid.y = verticalMargin;
	grid.gridUnit = gridUnit;
	return grid;
}

function setFontSize(fSize) {
	fontSize = fSize;
}

function setFontFamily(fFamily) {
	fontFamily = fFamily;
}

function setFont(){
	graphicsContext.font = fontSize + "px " + fontFamily;
}


//use graphicsContext.measureText() to get TextMetrics object for text width
//console.log(graphicsContext.measureText("M").width);
