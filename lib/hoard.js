var JSHoard = JSHoard || {};

JSHoard.Hoard = function(storageEngine) {
	
	this.storageEngine = storageEngine;

	this.set = function(key, value) {
		this.storageEngine.set(key, value);
	};

	this.remove = function(key) {
		this.storageEngine.remove(key);
	};

	this.get = function(key) {
		return this.storageEngine.get(key);
	};
};