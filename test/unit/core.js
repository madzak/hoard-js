module("core");

test("basic", function() {
    expect(3);
    
    ok( JSON.parse, "JSON.parse()" );
    ok( JSON.stringify, "JSON.stringify()" );
    ok( JSHoard.Hoard, "JSHoard.Hoard()" );
});

/* Mocked Engine */
var mockStorage = {};
var MockEngine = function() {
    this.name = function () {
        return "MockEngine";
    };
	
	this.set = function(key, value) {
		mockStorage[key] = value;
	};
	
	this.remove = function(key){
		delete mockStorage[key];
	};
	
	this.get = function(key){
		return mockStorage[key];
	};
};
MockEngine.test = function() {
    return true;
};

/* Core Hoard Object Testing */
test ("Hoard()", function() {
    expect(5);
    
    /* Construction Tests */
    var emptyHorde = new JSHoard.Hoard();
    ok(emptyHorde, "Empty Engine Construct");
    
    var engine = new MockEngine();
    var specificHorde = new JSHoard.Hoard(engine);
    deepEqual(specificHorde.storageEngine, engine, "Constucted with Fake Engine");
    
    /* Set Tests */
    specificHorde.set("set_test", "testing a string");
    equal(mockStorage.set_test, "testing a string", "Engine Set");
    
    /* Get tests */
    mockStorage.get_test = "a test of getting";
    equal(specificHorde.get("get_test"), mockStorage.get_test, "Engine Get");
    
    /* Get tests */
    mockStorage.remove_test = "remove me please";
    specificHorde.remove("remove_test");
    ok(!mockStorage.remove_test, "Engine Remove");
});

test ("ObjectHoard()", function() {
    expect(3);
    
    var engine = new MockEngine();
    var objectHoard = new JSHoard.ObjectHoard("test_obj", engine);
    
    /* Set Tests */
    objectHoard.set("set_test", "testing a string");
    var parsedObj = JSON.parse(mockStorage.test_obj);
    equal(parsedObj.set_test, "testing a string", "Engine Set");
    
    /* Get tests */
    objectHoard.set("get_test", "a test of getting");
    equal(objectHoard.get("get_test"), "a test of getting", "Engine Get");
    
    /* Get tests */
    objectHoard.set("remove_test", "remove me please");
    objectHoard.remove("remove_test");
    ok(!JSON.parse(mockStorage.test_obj).remove_test, "Engine Remove");
});