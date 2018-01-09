var canvas = document.getElementById("canvas");
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
var context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;
context.font = "8px Tahoma";
var images = document.getElementById("images");

var cx = canvas.width;
var cy = canvas.height;
var ix = images.width;
var iy = images.height;

var count = 0;

var left = false;
var right = false;
var up = false;
var down = false;

var score = 0;
var highScore = 0;

var player = new Ship(cx/2, cy/2, 10, 20);
var planets = [];
var icePlanets = [];
var asteroids = [];
var solarFlares = [];

function Ship(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.move = function(mx, my) {
		var newX = this.x + mx;
		if(newX > cx) {
			this.x = newX - cx;
		} else if(newX < 0) {
			this.x = newX + cx;
		} else {
			this.x = newX;
		}
		var newY = this.y + my;
		if(newY > cy) {
			this.y = cy;
		} else if(newY < 0) {
			this.y = 0;
		} else {
			this.y = newY;
		}
	}
}

function Planet(x, y, w, h, vx, vy) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.vx = vx;
	this.vy = vy;
}

function IcePlanet(x, y, w, h, vx, vy) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.vx = vx;
	this.vy = vy;
}

function Asteroid(x, y, w, h, vx, vy) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.vx = vx;
	this.vy = vy;
}

function SolarFlare(x, y, w, h, vx, vy) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.vx = vx;
	this.vy = vy;
}

function drawMagenta(x, y, width, height) {
	context.drawImage(images, 0, 0, 10, 10, x, y, width, height);
}

function drawSunWhite(x, y, width, height, frame) {
	switch(frame) {
		case 0: context.drawImage(images, 10, 0, 10, 10, x, y, width, height);
		break;
		case 1: context.drawImage(images, 50, 0, 10, 10, x, y, width, height);
		break;
	}
}

function drawSunYellow(x, y, width, height, frame) {
	context.drawImage(images, 20, 0, 10, 10, x, y, width, height)
	switch(frame) {
		case 0: context.drawImage(images, 20, 0, 10, 10, x, y, width, height);
		break;
		case 1: context.drawImage(images, 60, 0, 10, 10, x, y, width, height);
		break;
	}
}

function drawSunOrange(x, y, width, height, frame) {
	switch(frame) {
		case 0: context.drawImage(images, 30, 0, 10, 10, x, y, width, height);
		break;
		case 1: context.drawImage(images, 70, 0, 10, 10, x, y, width, height);
		break;
	}
}

function drawSunRed(x, y, width, height, frame) {
	switch(frame) {
		case 0: context.drawImage(images, 40, 0, 10, 10, x, y, width, height);
		break;
		case 1: context.drawImage(images, 80, 0, 10, 10, x, y, width, height);
		break;
	}
}

function drawSolarFlare(x, y, width, height, frame) {
	switch(frame) {
		case 0: context.drawImage(images, 90, 0, 10, 10, x, y, width, height);
		break;
		case 1: context.drawImage(images, 0, 10, 10, 10, x, y, width, height);
		break;
	}
}

function drawAsteroid(x, y, width, height, frame) {
	switch(frame) {
		case 0: context.drawImage(images, 10, 10, 10, 10, x, y, width, height);
		break;
		case 1: context.drawImage(images, 20, 10, 10, 10, x, y, width, height);
		break;
		case 2: context.drawImage(images, 30, 10, 10, 10, x, y, width, height);
	}
}

function drawShip(x, y, width, height) {
	context.drawImage(images, 40, 10, 10, 20, x, y, width, height);
}

function drawPlanet(x, y, width, height) {
	context.drawImage(images, 50, 10, 20, 20, x, y, width, height);
}

function drawIcePlanet(x, y, width, height) {
	context.drawImage(images, 70, 10, 20, 20, x, y, width, height);
}

function mouseDown(event) {
}

function mouseUp(event) {
}

function keyDown(event) {
	switch(event.code) {
		case "KeyW": up = true;
		break;
		case "KeyA": left = true;
		break;
		case "KeyS": down = true;
		break;
		case "KeyD": right = true;
		break;
	}
}

function keyUp(event) {
	switch(event.code) {
		case "KeyW": up = false;
		break;
		case "KeyA": left = false;
		break;
		case "KeyS": down = false;
		break;
		case "KeyD": right = false;
		break;
	}
}

function init() {
}

function update() {
	var dx = 0;
	var dy = 0;
	if(up) {
		dy -= 10;
	}
	if(down) {
		dy += 10;
	}
	if(left) {
		dx -= 10;
	}
	if(right) {
		dx += 10;
	}
	player.move(dx, dy);
}

function draw() {
	context.fillStyle = "#000000";
	context.fillRect(0, 0, cx, cy);
	context.fillStyle = "#FFFFFF";
	context.fillText("High Score: " + highScore, 5, 10);
	context.fillText("Score: " + score, 5, 30);


	var sunframe = count%2;
	var asteroidframe = count%3;
	for(var w = 0; w < cx/20; w++) {
		drawSunWhite(w*20, cy-20, 20, 20, sunframe);
		drawSunYellow(w*20, cy-40, 20, 20, sunframe);
		drawSunOrange(w*20, cy-60, 20, 20, sunframe);
		drawSunRed(w*20, cy-80, 20, 20, sunframe);
	}

	drawShip(player.x, player.y, player.width, player.height);

	if(solarFlares.length > 0) {
		drawSolarFlare(cx/2, cy/2, 20, 20, sunframe);
	}

	if(asteroids.length > 0) {
		drawAsteroid(cx/5, cy/5, 20, 20, asteroidframe);
	}

	if(planets.length > 0) {
		drawPlanet(250, 5, 50, 50);
	}

	if(icePlanets.length > 0) {
		drawIcePlanet(10, 10, 20, 20);
	}

	count++;
	if(count%10 == 0) {
		score++;
	}
}

var drawloop = setInterval(function(){update(); draw();}, 50);
