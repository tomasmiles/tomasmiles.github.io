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

var elapsed = 0;

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
	newAsteroid.ySpeed = Math.random()*10;
	newAsteroid.draw = function() {
		sprites.asteroid.draw(this.x, this.y, 10, 10);
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
	var citiesPos = [0, 20, 40, 60, 80, 100];
	for(var c = 0; c < citiesPos.length; c++) {
		ground.push(createCityTile(citiesPos[c], 250, true));
		ground.push(createCityTile(citiesPos[c], 240, false));
		ground.push(createCityTile(citiesPos[c], 230, false));
		ground.push(createCityTile(citiesPos[c], 220, false));
	}
}

var player = new Object();

function initPlayer() {
	player.x = canvas.width/2;
	player.y = canvas.height/2;
	player.width =  10;
	player.speed = 100;
	player.draw = function() {
		sprites.robot.draw(player.x, player.y, player.width, player.width);
	}
	player.xVel = 0;
	player.yVel = 0;
}

function advance() {
	delta = (Date.now() - lastFrame) / 1000;
	lastFrame = Date.now();
	if(!paused) {
		player.x+=(input.x*player.speed*delta);
		player.y+=(input.y*player.speed*delta);

		for(var a = 0; a < asteroids.length; a++) {
			asteroids[a].x += asteroids[a].xSpeed*delta;
			asteroids[a].y += asteroids[a].ySpeed*delta;
			for(var c = 0; c < city.length; c++) {
			}
		}
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
}

function keyup(event) {
	//console.log(event);
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
	//console.log(event);
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
	case 'Escape' : initGame();
	clearGame();
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
	context.strokeText(elapsed, 10, 20);
	player.draw();
	for(var a = 0; a < asteroids.length; a++) {
		asteroids[a].draw();
	}
}

initGame();
var loop = setInterval(function(){draw(); advance()}, 15);
var seconds = setInterval(function(){elapsed++} , 1000);
