JSHoard.Engines = JSHoard.Engines || {};

(function($) {
    JSHoard.Engines.cookiestorage = function() {
	    this.name = function () {
		    return "cookiestorage";
	    };
	
	    this.set = function(key, value) {
		    $.cookie(key, value);
	    };
	
	    this.remove = function(key){
		    this.set(key, null);
	    };
	
	    this.get = function(key){
		    return $.cookie(key) || "";
	    };
    };

    JSHoard.Engines.cookiestorage.test = function() {
	    var testCookie = "testForCookies";
	
	    $.cookie(testCookie, true);
	    if($.cookie(testCookie)) {
		    $.cookie(testCookie, null);
		    return true;
	    }
	
	    return false;
    }
})(jQuery);