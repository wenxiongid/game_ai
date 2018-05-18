var Q = require('q');

var keys = [
	'm-b0v3QMxNAPzA82P7e0XcK9I_xEpVba'
];

var tinify = require('tinify');

var currentIndex = -1;

var getNewKey = function(){
	++currentIndex;
	tinify.key = keys[currentIndex];
	tinify.validate(function(err){
		if(err){}
	});
};

var getKey = function(){
	var defer = Q.defer();
	if(currentIndex >= 0){
		defer.resolve(keys[currentIndex]);
	}else{

	}
	return defer.promise;
};