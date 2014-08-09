var GameRulesFactory = require('./GameRulesFactory'),
	Match = require('./Match.js');

var MatchFactory = function(rules){
	var rulesFactory = new GameRulesFactory(rules);

	this.create = function(opponent1, opponent2){
		return new Match(opponent1, opponent2, rulesFactory);
	};
};

module.exports = MatchFactory;