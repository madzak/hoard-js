var JSHoard = JSHoard || {};
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