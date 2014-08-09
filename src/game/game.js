var MatchFactory = require('./MatchFactory');

var Game = function(rules){
	var competitors = [],
		matchFactory = new MatchFactory(rules);

	this.addCompetitor = function(competitor){
		competitors.push(competitor);
		return this;
	};
	this.startRound = function(){
		var competitor1 = competitors[0],
			competitor2 = competitors[1];

		if (!!competitor1 && competitor2){
			matchFactory.create(competitor1, competitor2).start();
		}
	};
};

module.exports = Game;