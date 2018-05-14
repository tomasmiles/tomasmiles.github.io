var canvas = document.getElementById('canvas');
var graphicsContext = canvas.getContext('2d');

function draw() {
	graphicsContext.fillStyle = "#000000";
	graphicsContext.fillRect(0, 0, canvas.width, canvas.height);
}

function resize() {
	canvas.width =  window.innerWidth;
	canvas.height = window.innerHeight;
}
