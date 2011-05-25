module("core");

test("basic", function() {
    expect(2);
    ok( JSON.parse, "JSON.parse()" );
    ok( JSON.stringify, "JSON.stringify()" );
});