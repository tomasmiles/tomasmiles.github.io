//In graphics.js
window.addEventListener('resize', resize);
// gui.js
window.addEventListener('pointerdown', pointerdown);
window.addEventListener('pointerup', pointerup);
window.addEventListener('pointermove', pointermove);

resize();
//draw() from graphics.js
//update() from game.js

var loop = setInterval(function(){update();draw();}, 50);
