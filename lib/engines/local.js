JSHoard.Engines = JSHoard.Engines || {};

JSHoard.Engines.localstorage = function() {
	this.name = function () {
		return "localstorage";
	};
	
	this.set = function(key, value) {
		localStorage.setItem(key, value);
	};
	
	this.remove = function(key){
		localStorage.removeItem(key);
	};
	
	this.get = function(key){
		return localStorage.getItem(key);
	};
};

JSHoard.Engines.localstorage.test = function() {
	return !!window.localStorage;
}