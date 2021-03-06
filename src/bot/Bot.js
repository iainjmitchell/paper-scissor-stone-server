var httpsync = require('httpsync');

var Bot = function(uri){
	var START_ROUND_REQUEST = { url : uri + '/round', method : 'POST' },
		START_MATCH_REQUEST = { url : uri + '/match', method : 'POST' },
		WIN_MATCH_REQUEST = { url : uri + '/win', method : 'POST' },
		GET_MOVE_REQUEST = { url : uri + '/move' };  

	this.startRound = function(){
		httpsync.request(START_ROUND_REQUEST);
	};

	this.startMatch = function(){
		httpsync.request(START_MATCH_REQUEST);
	};

	this.move = function(){
		var response = httpsync.get(GET_MOVE_REQUEST).end();
		return response.data.toString();
	};

	this.win = function(){
		httpsync.request(WIN_MATCH_REQUEST);
	};
};

module.exports = Bot;