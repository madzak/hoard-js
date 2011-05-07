JSHoard.Engines = JSHoard.Engines || {};

JSHoard.Engines.globalstorage = function() {
	var storage = globalStorage[location.hostname];
	
	this.name = function () {
		return "globalstorage";
	};
	
	this.set = function(key, value) {
		this.storage.setItem(key, value);
	};
	
	this.remove = function(key){
		this.storage.removeItem(key);
	};
	
	this.get = function(key){
		return this.storage.getItem(key);
	};
};

JSHoard.Engines.globalstorage.test = function() {
	return !!window.globalStorage;
}