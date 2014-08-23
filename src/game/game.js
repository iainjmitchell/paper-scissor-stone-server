var CompetitorMatchesFactory = require('./CompetitorMatchesFactory');

var Game = function(rules){
	var competitors = [],
		competitorMatchesFactory = new CompetitorMatchesFactory(rules, startRoundForNextCompetitor);

	this.addCompetitor = function(competitor){
		competitors.push(competitor);
		return this;
	};

	this.startRound = function(){
		competitors.forEach(function(competitor){
			competitor.roundStarted();
		});
		startRoundForNextCompetitor();
	};

	function startRoundForNextCompetitor(){
		var competitor = competitors.pop();
		competitorMatchesFactory.create(competitor, competitors).play();
	}
};

module.exports = Game;