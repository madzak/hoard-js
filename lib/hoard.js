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

JSHoard.ObjectHoard = function(storageKey, storageEngine) {
    
    var hoard = new JSHoard.Hoard(storageEngine);
	
    var keyValueObject = hoard.get(storageKey) ? JSON.parse(hoard.get(storageKey)) : {};

    this.get = function(key) {
        return keyValueObject[key];
    };
    
    this.remove = function(key) {
        commitChange(function() {
            delete keyValueObject[key];
        });
    };
    
    this.set = function(key, value) {
        commitChange(function() {
            keyValueObject[key] = value;
        });
    };

    function commitChange(func) {
        func();
        hoard.set(storageKey, JSON.stringify(keyValueObject));
    }
};

JSHoard.StorageEngineFactory = JSHoard.StorageEngineFactory || {};
(function (namespace) {
    
	namespace.getSupportedEngine = function() {
		for(var engine in JSHoard.Engines) {
			if(JSHoard.Engines[engine].test()) {
				return namespace.getEngine(engine);
			}
		}
		
		return false;
	};
	
	namespace.getEngine = function(engineName) {
		return new JSHoard.Engines[engineName]();
	};
})(JSHoard.StorageEngineFactory);