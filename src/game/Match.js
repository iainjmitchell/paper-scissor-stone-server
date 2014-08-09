var MatchScoreboard = require('./MatchScoreboard');

var Match = function(opponent1, opponent2, rulesFactory){
	var matchScoreboard = new MatchScoreboard(opponent1, opponent2, playPoint);

	this.start = function(){
		opponent1.matchStarted();
		opponent2.matchStarted();
		playPoint();
	};

	function playPoint(){
		var opponent1Move = opponent1.getMove(),
			opponent2Move = opponent2.getMove();

		if (rulesFactory.create(opponent2Move).beats(opponent1Move)){
			matchScoreboard.pointScoredBy(opponent2);
		} else if (rulesFactory.create(opponent1Move).beats(opponent2Move)){
			matchScoreboard.pointScoredBy(opponent1);
		} 
		else matchScoreboard.draw(); 
	}
};



module.exports = Match;