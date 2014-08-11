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
			count = 1;
		
		for (count; count < competitors.length; count++){
			var competitor2 = competitors[count];
			matchFactory.create(competitor1, competitor2).start();
		}
	};
};

module.exports = Game;