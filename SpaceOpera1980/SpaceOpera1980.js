var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var tileSprites = document.getElementById("tiles");
var paused = false;

var input = new Object();
input.x = 0;
input.y = 0;
input.left = false;
input.right = false;
input.up = false;
input.down = false;
input.calculateVector = function() {
	input.x = 0;
	input.y = 0;
	if(input.left) {
		input.x-=1;
	}
	if(input.right) {
		input.x+=1;
	}
	if(input.up) {
		input.y-=1;
	}
	if(input.down) {
		input.y+=1;
	}
	if(input.x != 0 && input.y != 0) {
		var magnitude = Math.sqrt(Math.pow(input.x, 2) + Math.pow(input.y, 2));
		input.x = input.x/magnitude;
		input.y = input.y/magnitude;
	}
}

var lastFrame = Date.now();
var delta = 0;

var sprites =  new Object();

function createSprite(sX, sY, sW, sH) {
	var newSprite = new Object();
	newSprite.sourceX = sX;
	newSprite.sourceY = sY;
	newSprite.sourceWidth = sW;
	newSprite.sourceHeight = sH;
	newSprite.draw = function(x, y, w, h) {
		context.drawImage(tileSprites, this.sourceX, this.sourceY, this.sourceWidth, this.sourceHeight, x, y, w, h);
	}
	return newSprite;
};

sprites.ground = createSprite(0, 0, 10, 10);
sprites.baseRoot = createSprite(10, 0, 10, 10);
sprites.baseWindow = createSprite(20, 0, 10, 10);
sprites.asteroid = createSprite(30, 0, 10, 10);
sprites.robot = createSprite(40, 0, 10, 10);

function createGroundTile(x, y) {
	var newTile = new Object();
	newTile.x = x;
	newTile.y = y;
	newTile.draw = function() {
		sprites.ground.draw(x, y, 10, 10);
	}
	return newTile;
}

function createCityTile(x, y, root) {
	var newTile = new Object();
	newTile.x = x;
	newTile.y = y;
	newTile.root = root;
	newTile.draw = function() {
		if(this.root) {
			sprites.baseRoot.draw(x, y, 10, 10);
		} else {
			sprites.baseWindow.draw(x, y, 10, 10);
		}
	}
	return newTile;
}

var asteroids = new Array();

function createAsteroid(x) {
	var newAsteroid = new Object();
	newAsteroid.x = x;
	newAsteroid.y = 0;
	newAsteroid.xSpeed = (Math.random()*2-1)*10;
	newAsteroid.ySpeed = Math.random()*50;
	newAsteroid.width = 10;
	newAsteroid.draw = function() {
		sprites.asteroid.draw(this.x, this.y, this.width, this.width);
	}
	asteroids.push(newAsteroid);
}

function removeAsteroid(index) {
	asteroids.splice(index, 1);
}

function initAsteroids() {
	for(var ast = 0; ast < 5; ast++) {
		createAsteroid((ast*50)+100);
	}
}

var ground = new Array();
function initGround() {
for(var gt = 0; gt < 40; gt++) {
		ground.push(createGroundTile(gt*10, 290));
		ground.push(createGroundTile(gt*10, 280));
		ground.push(createGroundTile(gt*10, 270));
		ground.push(createGroundTile(gt*10, 260));
	}
}

var city = new Array();
function initCity() {
	var citiesPos = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380];
	for(var c = 0; c < citiesPos.length; c++) {
		ground.push(createCityTile(citiesPos[c], 250, true));
		ground.push(createCityTile(citiesPos[c], 240, false));
		ground.push(createCityTile(citiesPos[c], 230, false));
		ground.push(createCityTile(citiesPos[c], 220, false));
	}
}

var projectiles = new Array();
function createProjectile(x, y, xSpeed, ySpeed) {
	var newProjectile = new Object();
	newProjectile.x = x;
	newProjectile.y = y;
	newProjectile.width = 10;
	newProjectile.xSpeed = xSpeed;
	newProjectile.ySpeed = ySpeed;
	newProjectile.draw = function() {
		context.fillStyle = "#00FF00";
		context.fillRect(newProjectile.x, newProjectile.y, newProjectile.width, newProjectile.width);
	}
	projectiles.push(newProjectile);
}
function  removeProjectile(index) {
	projectiles.splice(index, 1);
}

var player = new Object();

function initPlayer() {
	player.x = canvas.width/2;
	player.y = canvas.height/2;
	player.width =  10;
	player.speed = 100;
	player.cooldown = 0;
	player.cooldownLimit = 400;
	player.draw = function() {
		sprites.robot.draw(player.x, player.y, player.width, player.width);
	}
	player.fire = function() {
		if(player.cooldown == 0) {
			player.cooldown = player.cooldownLimit;
			createProjectile(player.x, player.y, 0, -100);
		}
	}
	player.reduceCooldown = function(delta) {
		player.cooldown -= delta;
		if(player.cooldown < 0) player.cooldown = 0;
	}
	player.xVel = 0;
	player.yVel = 0;
}

function collideTwoBoxes(x1, y1, w1, h1, x2, y2, w2, h2) {
	var collided = false;
	/*
	What can we derive from the top left corner and width and height of the two boxes?
	- We have the x and y positions of each corner of each box
	- We have the bounds of each box
	How do we see if the boxes intersect?
	- Compare first and second boxes
	*/
	return collided;
}

function advance() {
	delta = ((Date.now() - lastFrame)/1000);
	lastFrame = Date.now();
	if(!paused) {
		//Move objects
		player.x+=(input.x*player.speed*delta);
		player.y+=(input.y*player.speed*delta);
		for(var a = 0; a < asteroids.length; a++) {
			asteroids[a].x += asteroids[a].xSpeed*delta;
			asteroids[a].y += asteroids[a].ySpeed*delta;
		}
		for(var pr = 0; pr < projectiles.length; pr++) {
			projectiles[pr].x += projectiles[pr].xSpeed*delta;
			projectiles[pr].y += projectiles[pr].ySpeed*delta;
		}
		//Collide objects
		for(var a2 = 0; a2 < asteroids.length; a2++) {
			var xA = asteroids[a2].x;
			var yA = asteroids[a2].y;
			var wA = asteroids[a2].width;
			var hA = asteroids[a2].width;
			//Screen bounds
			if(asteroids[a2].x+asteroids[a2].width < 0 || asteroids[a2].x > canvas.length || asteroids[a2].y+asteroids[a2].width < 0 || asteroids[a2].y > canvas.height) {
				removeAsteroid(a2);
			} else {
				//Player
				var xP = player.x;
				var yP = player.y;
				var wP = player.width;
				var hP = player.width;
				console.log(collideTwoBoxes(xA, yA, wA, hA, xP, yP, wP, hP));
				var playerMidX = player.x + player.width/2;
				var playerMidY = player.y + player.width/2;
				var asteroidMidX = asteroids[a2].x + asteroids[a2].width/2;
				var asteroidMidY = asteroids[a2].y + asteroids[a2].width/2;
				var xDif = asteroidMidX - playerMidX;
				var yDif = asteroidMidY - playerMidY;
				var xCollision = false;
				var yCollision = false;
				if(xDif < 0) {
					if(0 - xDif < asteroids[a2].width/2 + player.width/2) {
						xCollision = true;
					}
				} else if(xDif < asteroids[a2].width/2 + player.width/2) {
					xCollision = true;
				}
				if(yDif < 0) {
					if(0 - yDif < asteroids[a2].width/2 + player.width/2) {
						yCollision = true;
					}
				} else if(yDif < asteroids[a2].width/2 + player.width/2) {
						yCollision = true;
				}
				var collision = xCollision && yCollision;
				if(collision) {
					removeAsteroid(a2);
				}
			}
		}
		player.reduceCooldown(delta*1000);
	}
}

document.addEventListener("keyup", keyup);
document.addEventListener("keydown", keydown);

function initGame() {
	initGround();
	initCity();
	initAsteroids();
	initPlayer();
}

function clearGame() {
	ground = null;
	ground = new Array();
	city = null;
	city = new Array();
	asteroids = null;
	asteroids = new Array();
	projectiles = null;
	projectiles = new Array();
}

function keyup(event) {
	switch(event.key) {
	case 'a' : input.left = false;
	break;
	case 'd' : input.right = false;
	break;
	case 'w' : input.up = false;
	break;
	case 's' : input.down = false;
	break;
	};
	input.calculateVector();
}

function keydown(event) {
	switch(event.key) {
	case 'a' : input.left = true;
	break;
	case 'd' : input.right = true;
	break;
	case 'w' : input.up = true;
	break;
	case 's' : input.down = true;
	break;
	case 'p' : paused = !paused;
	break;
	case ' ' : player.fire();
	break;
	case 'Escape' : clearGame();
	initGame();
	break;
	};
	input.calculateVector();
}

function draw() {
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	for(var g = 0; g < ground.length; g++) {
		ground[g].draw();
	}
	context.strokeStyle = "#FFFFFF";
	context.strokeText(player.cooldown, 360, 20);
	player.draw();
	for(var a = 0; a < asteroids.length; a++) {
		asteroids[a].draw();
	}
	//console.log(projectiles);
	for(var p = 0; p < projectiles.length; p++) {
		projectiles[p].draw();
	}
}

initGame();
var loop = setInterval(function(){draw(); advance()}, 30);
