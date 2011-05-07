JSHoard.Engines = JSHoard.Engines || {};

/* Currently not working */
(function (namespace) {
	var sql = {
			name: "JSHoard",
			desc: "JSHoard LocalStorage",
			version: 1,
			size: 204800, //2 meg
			create: "CREATE TABLE IF NOT EXISTS jshoard_data (k TEXT UNIQUE NOT NULL PRIMARY KEY, v TEXT NOT NULL)",
			get: "SELECT v FROM jshoard_data WHERE k = ?",
			set: "INSERT INTO jshoard_data(k, v) VALUES (?, ?)",
			remove: "DELETE FROM jshoard_data WHERE k = ?" 
		};
	
	namespace.whatwg_db = function () {
		this.db = window.openDatabase(sql.name, sql.version);
		this.db.executeSql(sql.create, function() {this.db_created = true;});
	}
	
	namespace.whatwg_db.prototype.name = function () {
		return "whatwg_db";
	}
	
	namespace.whatwg_db.prototype.set = function(key, value) {
		this.db.executeSql(sql.remove, [key], function() {
			this.db.executeSql(sql.set, [key, val], function() {
				return true;
			});
		});
		
		return false;
	}
	
	namespace.whatwg_db.prototype.remove = function(key){
		this.db.executeSql(sql.remove, [key], function() {
			return true;
		});
		
		return false;
	}
	
	namespace.whatwg_db.prototype.get = function(key){
		this.db.executeSql(sql.get, [key], function(t, r) {
			if (r.rows.length > 0) {
				return r.rows.item(0)['v'];
			}
		});
		
		return false;
	}
	
	namespace.whatwg_db.test = function() {
		return !!window.openDatabase;
	}
})(JSHoard.Engines);