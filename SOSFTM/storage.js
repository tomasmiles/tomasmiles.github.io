function storeItem(key, value) {
	localStorage.setItem(key, value);
}

function loadItem(key) {
	return localStorage.getItem(key);
}

function deleteItem(key) {
	localStorage.removeItem(key);
}
