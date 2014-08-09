var GameRulesFactory = require('./GameRulesFactory');

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

var MatchFactory = function(rules){
	var rulesFactory = new GameRulesFactory(rules);

	this.create = function(opponent1, opponent2){
		return new Match(opponent1, opponent2, rulesFactory);
	};
};

var Match = function(opponent1, opponent2, rulesFactory){
	var WIN_POINT = 100,
		MAX_DRAWN_POINTS = 200,
		drawn_points = 0,
		scores = {
			'opponent1' : 0,
			'opponent2' : 0 
		},
		matchScoreboard = new MatchScoreboard(opponent1, opponent2, playPoint);

	this.start = function(){
		opponent1.matchStarted();
		opponent2.matchStarted();
		playPoint();
	};

	function playPoint(){
		var opponent1Move = opponent1.getMove(),
			opponent2Move = opponent2.getMove();

		if (rulesFactory.create(opponent2Move).beats(opponent1Move)){
			matchScoreboard.opponent2Scores();
		} else if (rulesFactory.create(opponent1Move).beats(opponent2Move)){
			matchScoreboard.opponent1Scores();
		} 
		else matchScoreboard.draw(); 
	}
};

var MatchScoreboard = function(opponent1, opponent2, playNextPoint){
	var SCORING_RULES = {
			WIN_POINT : 100,
			MAX_DRAWN_POINTS : 200
		},
		drawn_points = 0,
		scores = {
			'opponent1' : 0,
			'opponent2' : 0 
		};

	this.opponent1Scores = function(){
		scores['opponent1']++;
		if (scores['opponent1'] === SCORING_RULES.WIN_POINT){
			opponent1.win();
		}
		else playNextPoint();
	};

	this.opponent2Scores = function(){
		scores['opponent2']++;
		if (scores['opponent2'] === SCORING_RULES.WIN_POINT){
			opponent2.win();
		}
		else playNextPoint();
	};

	this.draw = function(){
		drawn_points++;
		if (drawn_points !== SCORING_RULES.MAX_DRAWN_POINTS){
			playNextPoint();
		}
	};
};

module.exports = Game;