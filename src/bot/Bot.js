var httpsync = require('httpsync');
// var req = httpsync.get({ url : "http://localhost:1337"});
// var res = req.end();
// console.log(res.data.toString());

var Bot = function(uri){
	var START_ROUND_REQUEST = { url : uri + '/round', method : 'POST' }; 

	this.startRound = function(){
		httpsync.request(START_ROUND_REQUEST);
	};
	this.startMatch = function(){

	};
	this.move = function(){

	};
	this.win = function(){

	};
};

module.exports = Bot;