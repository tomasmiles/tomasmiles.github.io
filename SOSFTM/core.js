var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var isPointerDown = false;

window.addEventListener('resize', resizeCanvas);
window.addEventListener('pointerdown', pointerDown);
window.addEventListener('pointerup', pointerUp);
window.addEventListener('pointermove', pointerMove);

var player = {}

setPositionOf(player, 0, 0);
setVelocityOf(player, 0.01, 0.01);
setIdOf(player, "player");
player.draw = function(drawX, drawY) {
	context.fillStyle = "#00FF00";
	context.fillRect(drawX-5, drawY-5, 10, 10);
}

var cam = new Camera(player.x, player.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

var entities = [player];

var waypoint = [0,0];

var pointer = {};
pointer.x = canvas.width/2;
pointer.y = canvas.height/2;

resizeCanvas();
var mainloop = setInterval(function(){draw(); update();}, 50);

function update() {
	setPositionOf(player, player.x+player.velX, player.y+player.velY);
	setPositionOf(cam, player.x, player.y);
}

function draw() {
	clearCanvas();
	cam.draw(entities);
	context.fillStyle = "#FFFFFF";
	context.fillText("Player position: " + player.x + ", " + player.y, 5, 10);
	context.fillText("Canvas dimensions: " + canvas.width + " x " + canvas.height, 5, 25);
	context.fillText("Camera position: " + cam.x + ", " + cam.y, 5, 40);
	context.fillText("Pointer position: " + pointer.x + ", " + pointer.y, 5, 55);
	context.strokeStyle = "#003300";
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	cam.viewportWidth = canvas.width;
	cam.viewportHeight = canvas.height;
	console.log(cam.viewportWidth + ", " + cam.viewportHeight);
}

function clearCanvas() {
	context.fillStyle = "#000000";
	context.fillRect(0,0, canvas.width, canvas.height);
}

function pointerDown(event) {
	waypoint[0] = cam.x - cam.viewportWidth/2 + pointer.x;
	waypoint[1] = cam.y - cam.viewportHeight/2 + pointer.y;
	console.log(waypoint);
	player.velX = 0;
	player.velY = 0;
}

function pointerUp(event) {
}

function pointerMove(event) {
	pointer.x = event.x;
	pointer.y = event.y;
}

function setPositionOf(object, x, y) {
	object.x = x;
	object.y = y;
}

function setVelocityOf(object, x, y) {
	object.velX = x;
	object.velY = y;
}

function setIdOf(object, id) {
	object.id = id;
}

//What is a camera? It has a position in the world and can see an area
//It also should relay what it can see on an area on the canvas
//x, y, cameraWidth, cameraHeight, viewportX, viewportY, viewportWidth, viewportHeight
function Camera(x, y, cameraWidth, cameraHeight, viewportX, viewportY, viewportWidth, viewportHeight) {
	setPositionOf(this, x, y);
	this.cameraWidth = cameraWidth;
	this.cameraHeight = cameraHeight;
	this.viewportX = viewportX;
	this.viewportY = viewportY;
	this.viewportWidth = viewportWidth;
	this.viewportHeight = viewportHeight;

	this.worldToCameraCoords = function(coordPair) {
		var worldX = coordPair[0];
		var worldY = coordPair[1];
		var cameraCoords = [worldX-this.x+this.viewportX+this.viewportWidth/2, worldY-this.y+this.viewportY+this.viewportHeight/2];
		return cameraCoords;
	}
	this.draw = function(objects) {
		//World grid?
		/*
		context.strokeStyle = "#003300";
		for(var v = 0; v < this.viewportWidth; v++) {
			if(Math.round(this.x-this.viewportX/2+v)%50 == 0) {
				context.lineWidth = 1;
				context.beginPath();
				context.moveTo(this.viewportX+v, this.viewportY);
				context.lineTo(this.viewportX+v, this.viewportY+this.viewportHeight);
				context.closePath();
				context.stroke();
			}
		}
		for(var h = 0; h < this.viewportHeight; h++) {
			if(Math.round(this.y-this.viewportY/2+h)%50 == 0) {
				context.lineWidth = 1;
				context.beginPath();
				context.moveTo(this.viewportX, this.viewportY+h);
				context.lineTo(this.viewportX+this.viewportWidth, this.viewportY+h);
				context.closePath();
				context.stroke();
			}
		}
		*/

		//Camera centre?
		context.strokeStyle = "#FF0000";
		context.beginPath();
		context.moveTo(this.viewportX+this.viewportWidth/2, this.viewportY);
		context.lineTo(this.viewportX+this.viewportWidth/2, this.viewportY+this.viewportHeight);
		context.closePath();
		context.stroke();
		context.beginPath();
		context.moveTo(this.viewportX, this.viewportY+this.viewportHeight/2);
		context.lineTo(this.viewportX+this.viewportWidth, this.viewportY+this.viewportHeight/2);
		context.closePath();
		context.stroke();
		//Draw objects
		for(var o = 0; o < objects.length; o++) {
			var objCamCoords = this.worldToCameraCoords([objects[o].x, objects[o].y]);
			objects[o].draw(objCamCoords[0], objCamCoords[1]);
		}
	}
}
