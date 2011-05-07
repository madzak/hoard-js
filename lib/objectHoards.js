var JSHoard = JSHoard || {};

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
