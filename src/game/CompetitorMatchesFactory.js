var MatchFactory = require('./MatchFactory'),
	CompetitorMatches = require('./CompetitorMatches');

var CompetitorMatchesFactory = function(rules, onCompletedMatches){
	var matchFactory = new MatchFactory(rules),
		noMoreCompetitors = function(){};

	this.create = function(competitor, competitors){
		var whenCompletedMatches = (competitors.length !== 0) ? onCompletedMatches : noMoreCompetitors;
		return new CompetitorMatches(matchFactory, whenCompletedMatches, competitor, competitors);
	};
};

module.exports = CompetitorMatchesFactory;