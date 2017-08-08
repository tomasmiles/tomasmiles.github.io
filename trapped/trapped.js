var canvas = document.getElementById('canvas');
var context =  canvas.getContext('2d');
var canvasWidth = 400;
var canvasHeight = 300;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

var playerImage = document.getElementById("playerImage");

var entities = [];

function entity(id, type, x, y, width, image, direction) {
	this.id = id;
	this.type = type;
	this.x = x;
	this.y = y;
	this.width = width;
	this.image = image;
/*
Direction is integer, 0=N, 1=E, 2=S, 3=W
*/
	this.direction = direction;

	this.move = function(distance) {
		var moveX = 0;
		var moveY = 0;
		switch(this.direction) {
			case 0:
				moveY -= distance;
				break;
			case 1:
				moveX = distance;
				break;
			case 2:
				moveY = distance;
				break;
			case 3:
				moveX -= distance;
				break;
		}
		this.x+=moveX;
		this.y+=moveY;
	}

	this.draw = function() {
		context.fillStyle = '#FF00FF';
		context.rect(this.x-width/2, this.y-width/2, width, width);
		context.stroke();
		switch(this.direction) {
			case 0:
				context.fillRect(this.x-width/20, this.y-width, width/10, width);
				break;
			case 1:
				context.fillRect(this.x, this.y-width/20, width, width/10);
				break;
			case 2:
				context.fillRect(this.x -width/20, this.y, width/10, width);
				break;
			case 3:
				context.fillRect(this.x-width, this.y-width/20, width, width/10);
				break;
		}
		context.drawImage(playerImage, this.x-width/2, this.y-width/2, width, width);
	}
}

function newGameSetup() {
	entities = [];
	entities.push(new entity('player', 'mobile', 200, 150, 20, 'player.png', 0));
}

function setCanvasSize(width, height) {
	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);
}

function clearCanvas(colour) {
	context.fillStyle = colour;
	context.fillRect(0, 0, canvasWidth, canvasHeight);
}

function draw() {
	clearCanvas('#000000');
	for(var e = 0; e < entities.length; e++) {
		entities[e].draw();
	}
}

function keyDownHandler(event) {
	switch(event.key) {
		case 'w':
			entities[0].direction = 0;
			break;
		case 'd':
			entities[0].direction = 1;
			break;
		case 's':
			entities[0].direction = 2;
			break;
		case 'a':
			entities[0].direction = 3;
			break;
		case 'Escape':
			newGameSetup();
			break;
	}
	entities[0].move(10);
}

function keyUpHandler(event) {
}

setCanvasSize(canvasWidth, canvasHeight);
clearCanvas('#000000');

newGameSetup();
var loop = setInterval(function(){draw();}, 50);
