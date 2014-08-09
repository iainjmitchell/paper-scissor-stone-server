var Game = function(display){
	var competitors = [],
		matchesPlayed = [];

	this.addCompetitor = function(competitor){
		competitors.push(competitor);
		return this;
	};
	this.startRound = function(){
		var competitor1 = competitors[0],
			competitor2 = competitors[1];

		if (!!competitor1 && competitor2){
			new Match(competitor1, competitor2).start();
		}
	};
};

var Match = function(opponent1, opponent2){
	var rules = new GameRules();

	this.start = function(){
		opponent1.matchStarted();
		opponent2.matchStarted();
		playPoint();
	};

	function playPoint(){
		var opponent1Move = opponent1.getMove(),
			opponent2Move = opponent2.getMove();
		if (rules.move(opponent2Move).beats(opponent1Move)){
			opponent2.win();
		}
		if (rules.move(opponent1Move).beats(opponent2Move)){
			opponent1.win();
		} 
	}
};

var GameRules = function(){
	var rules = {
			"paper" : { beats : [undefined, "stone"] },
			"stone" : { beats : [undefined]} 
		};
	this.move = function(move){
		return {
			beats : function(opponentsMove){
				return !!move && (move !== opponentsMove) && rules[move].beats.indexOf(opponentsMove) !== -1;
			}
		};
	};
};

module.exports = Game;