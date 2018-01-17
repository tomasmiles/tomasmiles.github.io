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

var isNewGame = true;

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
	this.hp = 100;
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
			isNewGame = true;
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

	this.move = function() {
		var newCoords = translate(this.x, this.y, this.vx, this.vy);
		this.x = newCoords[0];
		this.y = newCoords[1];
	}
}

function IcePlanet(x, y, w, h, vx, vy) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.vx = vx;
	this.vy = vy;

	this.move = function() {
		var newCoords = translate(this.x, this.y, this.vx, this.vy);
		this.x = newCoords[0];
		this.y = newCoords[1];
	}
}

function Asteroid(x, y, w, h, vx, vy) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.vx = vx;
	this.vy = vy;

	this.move = function() {
		var newCoords = translate(this.x, this.y, this.vx, this.vy);
		this.x = newCoords[0];
		this.y = newCoords[1];
	}
}

function SolarFlare(x, y, w, h, vx, vy) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.vx = vx;
	this.vy = vy;

	this.move = function() {
		var newCoords = translate(this.x, this.y, this.vx, this.vy);
		this.x = newCoords[0];
		this.y = newCoords[1];
	}
}

function translate(x, y, vx, vy) {
	return [x+vx, y+vy];
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

function collide(x1, y1, w1, h1, x2, y2, w2, h2) {
	var colliding = false;
	if(x1 < x2 + w2 &&
	x1 + w1 > x2 &&
	y1 < y2 + h2 &&
	y1 + h1 > y2) {
		colliding = true;
	}
	return colliding;
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
		case "KeyR": isNewGame = true;
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
	score = 0;
	player = new Ship(cx/2, cy/2, 10, 20);
	planets = [];
	planets.push(new Planet(0, 10, 50, 50, 3, 0.1));
	icePlanets = [];
	icePlanets.push(new IcePlanet(0, 80, 50, 50, 5, -0.25));
	asteroids = [];
	asteroids.push(new Asteroid(cx-20, 100, 10, 10, -5, 0));
	solarFlares = [];
	solarFlares.push(new SolarFlare(cx/2, cy, 10, 10, 0, -20));
}

function loss() {
	highScore = score;
	isNewGame = true;
}

function update() {
	if(isNewGame) {
		init();
		isNewGame = false;
	}

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
	for(var sf = 0; sf < solarFlares.length; sf++) {
		var currentFlare = solarFlares[sf];
		currentFlare.move();
		if(currentFlare.x > cx) {
			currentFlare.x = 0;
		} else if(currentFlare.x < 0) {
			currentFlare.x = cx;
		}
		if(currentFlare.y > cy) {
			currentFlare.y = 0;
		} else if(currentFlare.y < 0) {
			currentFlare.y = cy;
		}
		if(collide(player.x, player.y, player.width, player.height, currentFlare.x, currentFlare.y, currentFlare.w, currentFlare.h)) {
			player.hp -= 10;
		}
	}
	for(var ast = 0; ast < asteroids.length; ast++) {
		var currentAsteroid = asteroids[ast];
		currentAsteroid.move();
		if(currentAsteroid.x > cx) {
			currentAsteroid.x = 0;
		} else if(currentAsteroid.x < 0) {
			currentAsteroid.x = cx;
		}
		if(currentAsteroid.y > cy) {
			currentAsteroid.y = 0;
		} else if(currentAsteroid.y < 0) {
			currentAsteroid.y = cy;
		}
		if(collide(player.x, player.y, player.width, player.height, currentAsteroid.x, currentAsteroid.y, currentAsteroid.w, currentAsteroid.h)) {
			player.hp -= 5;
		}
	}
	for(var pln = 0; pln < planets.length; pln++) {
		var currentPlanet = planets[pln];
		currentPlanet.move();
		if(currentPlanet.x > cx) {
			currentPlanet.x = 0;
		} else if (currentPlanet.x < 0) {
			currentPlanet.x = cx;
		}
		if(currentPlanet.y < 0 || currentPlanet.y > cy) {
			planets.splice(pln, 1);
		}
		if(collide(player.x, player.y, player.width, player.height, currentPlanet.x, currentPlanet.y, currentPlanet.w, currentPlanet.h)) {
			player.hp -= 30;
		}
	}
	for(var ice = 0; ice < icePlanets.length; ice++) {
		var currentIce = icePlanets[ice];
		currentIce.move();
		if(currentIce.x > cx) {
			currentIce.x = 0;
		} else if(currentIce.x < 0) {
			currentIce.x = cx;
		}
		if(currentIce.y < 0 || currentIce.y > cy) {
			icePlanets.splice(ice, 1);
		}
		if(collide(player.x, player.y, player.width, player.height, currentIce.x, currentIce.y, currentIce.w, currentIce.h)) {
			player.hp -= 40;
		}
	}
	if(player.hp <= 0) {
		loss();
	}
	count++;
	if(count%10 == 0) {
		score++;
	}
}

function draw() {
	context.fillStyle = "#000000";
	context.fillRect(0, 0, cx, cy);

	var sunframe = count%2;
	for(var w = 0; w < cx/20; w++) {
		drawSunWhite(w*20, cy-20, 20, 20, sunframe);
		drawSunYellow(w*20, cy-40, 20, 20, sunframe);
		drawSunOrange(w*20, cy-60, 20, 20, sunframe);
		drawSunRed(w*20, cy-80, 20, 20, sunframe);
	}

	drawShip(player.x, player.y, player.width, player.height);

	if(solarFlares.length > 0) {
		for(var f = 0; f < solarFlares.length; f++) {
			var flare = solarFlares[f];
			drawSolarFlare(flare.x, flare.y, flare.w, flare.h, 0);
		}
	}

	if(asteroids.length > 0) {
		for(var a = 0; a < asteroids.length; a++) {
			var asteroid = asteroids[a];
			drawAsteroid(asteroid.x, asteroid.y, asteroid.w, asteroid.h, 0);
		}
	}

	if(planets.length > 0) {
		for(var p = 0; p < planets.length; p++) {
			var planet = planets[p];
			drawPlanet(planet.x, planet.y, planet.w, planet.h);
		}
	}

	if(icePlanets.length > 0) {
		for(var i = 0; i < icePlanets.length; i++) {
			var icePlanet = icePlanets[i];
			drawIcePlanet(icePlanet.x, icePlanet.y, icePlanet.w, icePlanet.h);
		}
	}

	context.fillStyle = "#FFFFFF";
	context.fillText("High Score: " + highScore, 5, 10);
	context.fillText("Ship Integrity: ", 5, 20);
	if(player.hp > 75) { context.fillStyle = "#00FF00"; }
	else if(player.hp > 50) { context.fillStyle = "#FFFF00"; }
	else if(player.hp > 25) { context.fillStyle = "#FF8800"; }
	else { context.fillStyle = "#FF0000"; }
	context.fillRect(55, 12, 50/100*player.hp, 10);
	context.fillStyle = "#FFFFFF";
	context.fillText("Score: " + score, 5, 30);
}

var drawloop = setInterval(function(){update(); draw();}, 50);
