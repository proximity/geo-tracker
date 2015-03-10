(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./js/main.js":[function(require,module,exports){
var app = require('./app');

},{"./app":"/Users/jghazally/Documents/Node/geo-tracker/js/app.js"}],"/Users/jghazally/Documents/Node/geo-tracker/js/app.js":[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

$(function() {
	var map;
	var $map = $('#map');
	var $latlng = $('#latlng');
	var watcher;
	var tracking_data = [];

	var $startBtn = $('#startWatching').on('click', startWatching);
	var $stopBtn = $('#stopWatching').on('click', stopWatching);

	map = new google.maps.Map($map[0], {
		zoom: 18,
		minZoom: 6,
	});

	var marker = new google.maps.Marker({
		map: map,
		flat: true,
	});


	function startWatching() {
		if ( ! window.navigator.geolocation) {
			$latlng.html('Geolocation is not supported by your browser');
			return;
		}

		function success(position) {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;

			$latlng.html('<strong>Latitude:</strong> ' + parseFloat(latitude + '').toFixed(3) + '&nbsp;&nbsp;&nbsp;<strong>Longitude:</strong> ' + parseFloat(longitude + '').toFixed(3));

			var latlng = new google.maps.LatLng(latitude, longitude);

			tracking_data.push(position);

			if ( typeof poly == 'undefined' ) {
				poly = new google.maps.Polyline({
					strokeColor: "#ff0000",
					strokeOpacity: 1.0,
					strokeWeight: 2
				});
				poly.setMap(map);
			}

			var path = poly.getPath().getArray();
			path.push(latlng);
			poly.setPath(path);

			map.setCenter(latlng);
			marker.setPosition(latlng);
		}

		function error() {
			$latlng.html('Unable to retrieve location');
		}

		$latlng.html('Locating...');
		$startBtn.attr('disabled', 'disabled');
		$stopBtn.removeAttr('disabled');

		watcher = navigator.geolocation.watchPosition(success, error, {enableHighAccuracy: true});
	}

	function stopWatching() {
		navigator.geolocation.clearWatch(watcher);

		$stopBtn.attr('disabled', 'disabled');
		$startBtn.removeAttr('disabled');
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},["./js/main.js"]);
