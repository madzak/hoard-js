JSHoard.Engines = JSHoard.Engines || {};

JSHoard.Engines.userdata = function () {
	createDataElement();
	
	this.name = function () {
		return "userdata";
	};

	this.set = function (key, value) {
		loadData(key, function (data) {
			data.setAttribute(key, value);
			data.save(key);
		});
	};

	this.remove = function (key) {
		loadData(key, function (data) {
			data.removeAttribute(key);
			data.save(key);
		});
	};

	this.get = function (key) {
		return loadData(key, function (data) {
			return data.getAttribute(key);
		});
	};

	function getDataElement() {
		return document.getElementById('_hoard_data');
	};
	
	function createDataElement() {
		dataEle = document.createElement('div');
		dataEle.id = "_hoard_data";
		dataEle.style.display = 'none';
		dataEle.addBehavior('#default#userData');

		document.body.appendChild(dataEle);
	}

	function loadData(key, func) {
		var data = getDataElement();
		data.load(key);
		return func(data);
	};
};

JSHoard.Engines.userdata.test = function() {
	return !!window.ActiveXObject;
};