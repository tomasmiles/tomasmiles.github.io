var pointerX;
var pointerY;
var guiState = "menu";

function pointerup(event) {
	console.log(event.x+ "," + event.y);
	if(guiState == "menu") guiState = "map";
	else if(guiState == "map") guiState = "planet";
	else if(guiState == "planet") guiState = "menu";
}

function pointerdown(event) {
}

function pointermove(event) {
	pointerX = event.x;
	pointerY = event.y;
}

function setGuiState(newState) {
	guiState = newState;
}

function drawGui(grid) {
	//Grid properties are gridHeight, gridWidth, height, width, x, y, gridUnit
	//if(pointerX > grid.x && pointerX < grid.x+grid.width
	//&& pointerY > grid.y && pointerY < grid.y+grid.height) {
		graphicsContext.strokeStyle = "#00FF00";
		for(gw = 0; gw < grid.gridWidth; gw++) {
			for(gh = 0; gh < grid.gridHeight; gh++) {
				graphicsContext.strokeRect(grid.x+grid.gridUnit*gw, grid.y+grid.gridUnit*gh, grid.gridUnit, grid.gridUnit);
			}
		}
	//}
	switch(guiState) {
		case "menu":
			graphicsContext.fillStyle = "#FFFFFF";
			graphicsContext.fillRect(grid.x, grid.y, grid.gridUnit*3, grid.gridUnit*2);
			graphicsContext.fillStyle = "#000000";
			graphicsContext.fillText("Menu", grid.x, grid.y+grid.gridUnit);
			break;
		case "map":
			graphicsContext.fillStyle = "#FFFFFF";
			graphicsContext.fillRect(grid.x, grid.y, grid.gridUnit*4, grid.gridUnit*2);
			graphicsContext.fillStyle ="#000000";
			graphicsContext.fillText("Star Map", grid.x, grid.y+grid.gridUnit);

			graphicsContext.fillRect(grid.x, grid.y+grid.gridUnit*3, grid.gridUnit*16, grid.gridUnit*16);
			break;
		case "planet":
			graphicsContext.fillStyle = "#FFFFFF";
			graphicsContext.fillRect(grid.x, grid.y, grid.gridUnit*3, grid.gridUnit*2);
			graphicsContext.fillStyle = "#000000";
			graphicsContext.fillText("Planet", grid.x, grid.y+grid.gridUnit);

			graphicsContext.fillRect(grid.x, grid.y+grid.gridUnit*3, grid.gridUnit*16, grid.gridUnit*16);
			break;
		default:
			break;
	}
	//Where should the GUI elements be?
}
