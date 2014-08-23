var MatchFactory = require('./MatchFactory');

var Game = function(rules){
	var competitors = [],
		matchFactory = new MatchFactory(rules);

	this.addCompetitor = function(competitor){
		competitors.push(competitor);
		return this;
	};
	this.startRound = function(){
		var competitor = competitors.pop();
		playMatches(competitor, competitors);
		if (competitors.length !== 0){
			this.startRound();
		}
	};
	function playMatches(competitor, opponents){
		var count = 0;
		for (count; count < opponents.length; count++){
			var opponent = opponents[count];
			matchFactory.create(competitor, opponent).start();
		}
	}
};

module.exports = Game;