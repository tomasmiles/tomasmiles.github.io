//In graphics.js
window.addEventListener('resize', resize);
// gui.js
window.addEventListener('pointerdown', pointerdown);
window.addEventListener('pointerup', pointerup);
window.addEventListener('pointermove', pointermove);

resize();
var loop = setInterval(function(){draw();}, 50);
