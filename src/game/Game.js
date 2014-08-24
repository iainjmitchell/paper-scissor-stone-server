var CompetitorMatchesFactory = require('./CompetitorMatchesFactory');

var Game = function(rules){
	var competitors = [];

	this.addCompetitor = function(competitor){
		competitors.push(competitor);
		return this;
	};

	this.startRound = function(){
		competitors.forEach(function(competitor){
			competitor.roundStarted();
		});
		new GameRound(rules, competitors).start();
		return this;
	};
};

var GameRound = function(rules, competitors){
	var remainingCompetitors = competitors.slice(),
		competitorMatchesFactory = new CompetitorMatchesFactory(rules, startRoundForNextCompetitor);

	this.start = startRoundForNextCompetitor;

	function startRoundForNextCompetitor(){
		var competitor = remainingCompetitors.pop();
		competitorMatchesFactory.create(competitor, remainingCompetitors).play();
	}
};

module.exports = Game;