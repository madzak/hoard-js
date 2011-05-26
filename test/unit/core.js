module("core", {
    setup: function() {
        this.mockStorage = {};
        (function(self) {
            MockEngine = function() {
                this.name = function () {
                    return "MockEngine";
                };
                
                this.set = function(key, value) {
                    self.mockStorage[key] = value;
                };
                
                this.remove = function(key){
                    delete self.mockStorage[key];
                };
                
                this.get = function(key){
                    return self.mockStorage[key];
                };
            };
            
            MockEngine.test = function() {
                return true;
            };
            
            self.mockEngine = MockEngine;
        })(this);
    }
});

test("basic", function() {
    expect(3);
    
    ok( JSON.parse, "JSON.parse()" );
    ok( JSON.stringify, "JSON.stringify()" );
    ok( JSHoard.Hoard, "JSHoard.Hoard()" );
});

/* Core Hoard Object Testing */
test ("Hoard", function() {
    expect(5);
    
    /* Construction Tests */
    var engine = new this.mockEngine(),
        emptyObj = new JSHoard.Hoard(),
        testObj = new JSHoard.Hoard(engine);
    
    ok(emptyObj, "Empty Engine Construct");
    deepEqual(testObj.storageEngine, engine, "Constucted with Fake Engine");
    
    /* Set Tests */
    testObj.set("set_test", "testing a string");
    equal(this.mockStorage.set_test, "testing a string", "Engine Set");
    
    /* Get tests */
    this.mockStorage.get_test = "a test of getting";
    equal(testObj.get("get_test"), this.mockStorage.get_test, "Engine Get");
    
    /* Get tests */
    this.mockStorage.remove_test = "remove me please";
    testObj.remove("remove_test");
    ok(!this.mockStorage.remove_test, "Engine Remove");
});

test ("ObjectHoard", function() {
    expect(3);
    
    var engine = new this.mockEngine(),
        testObj = new JSHoard.ObjectHoard("test_obj", engine);
    
    /* Set Tests */
    testObj.set("set_test", "testing a string");
    var parsedObj = JSON.parse(this.mockStorage.test_obj);
    equal(parsedObj.set_test, "testing a string", "Engine Set");
    
    /* Get tests */
    testObj.set("get_test", "a test of getting");
    equal(testObj.get("get_test"), "a test of getting", "Engine Get");
    
    /* Get tests */
    testObj.set("remove_test", "remove me please");
    testObj.remove("remove_test");
    ok(!JSON.parse(this.mockStorage.test_obj).remove_test, "Engine Remove");
});

test ("EngineFactory", function() {
    expect(2);
    
    var engines = JSHoard.Engines;
    JSHoard.Engines = {
        mockengine: this.mockEngine
    };
    
    var supported_engine = JSHoard.StorageEngineFactory.getSupportedEngine(),
        engine = JSHoard.StorageEngineFactory.getEngine('mockengine');
    
    deepEqual(supported_engine, new this.mockEngine(), "Test for supported engines");
    deepEqual(engine, new this.mockEngine(), "Ask for a specific engine");
    
    JSHoard.Engines = engines;
});