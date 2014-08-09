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
	this.start = function(){
		opponent1.matchStarted();
		opponent2.matchStarted();
		playPoint();
	};

	function playPoint(){
		var turn = opponent1.getMove(),
			otherTurn = opponent2.getMove();
		if (!!turn){
			if (turn !== otherTurn){
				opponent1.win();
			}
		} 
	}
};

module.exports = Game;