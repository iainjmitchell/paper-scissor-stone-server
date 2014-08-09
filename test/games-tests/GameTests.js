require('chai').should();

describe('When a game of paper, scissors, stone is started', function(){
	var alwaysStone = alwaysReturns('stone');

	describe('And a competitor is registered', function(){
		describe('and round is started', function(){
			it('Then competitor score on display is set to 0 (there is no one to fight)', function(){
				var mockCompetitor = new MockCompetitor();
				new Game()
					.addCompetitor(mockCompetitor)
					.startRound();
				mockCompetitor.score.should.equal(0);
			});
		});
	});

	describe('And two competitors are registered who return no moves', function(){
		describe('and round is started', function(){
			it('Then both competitors are notified of round starting', function(){
				var competitorsNotifiedOfRoundstarting = 0,
					mockCompetitor = {
						matchStarted : function(){
							competitorsNotifiedOfRoundstarting++;
						},
						updateScore : function(){}
					};
				new Game()
					.addCompetitor(mockCompetitor)
					.addCompetitor(mockCompetitor)
					.startRound();
				competitorsNotifiedOfRoundstarting.should.equal(2);
			});

			it('Then both competitors score on display is set to 0', function(){
				var noMoves = [],
					competitor1 = new MockCompetitor(noMoves),
					competitor2 = new MockCompetitor(noMoves);	
				new Game()
					.addCompetitor(competitor1)
					.addCompetitor(competitor2)
					.startRound();
				competitor1.score.should.equal(0);
				competitor2.score.should.equal(0);
			});
		});
	});

	// describe('And two competitors are registered one of which returns no moves', function(){
	// 	describe('and round is started', function(){
	// 		it('Then both competitors score on display is set to 0', function(){
	// 			var noMoves = [],
	// 				competitor1 = new MockCompetitor(alwaysStone),
	// 				competitor2 = new MockCompetitor(noMoves);	
	// 			new Game()
	// 				.addCompetitor(competitor1)
	// 				.addCompetitor(competitor2)
	// 				.startRound();
	// 			competitor1.score.should.equal(1);
	// 			competitor2.score.should.equal(0);
	// 		});
	// 	});
	// });

	function alwaysReturns(move){
		var count = 200,
			moves = [];
		for(count; count < 200; count--){
			moves.push(move);
		}
	}

	var MockCompetitor = function(moves){
		var moves = 0;
		this.score = -1;
		this.getMove = function(){
			moves++;
			return moves[count-1];
		};
		this.updateScore = function(newScore){
			this.score = newScore;
		};
		this.matchStarted = function(){};
	};

	// var FakeCompetitor = function(){
	// 	this.getMove = function()
	// 	this.updateScore = function(newScore){
	// 		this.score = newScore;
	// 	};
	// };
});

var Game = function(display){
	var competitors = [];

	this.addCompetitor = function(competitor){
		competitors.push(competitor);
		return this;
	};
	this.startRound = function(){
		competitors.forEach(function(competitor){
			competitor.matchStarted();
			competitor.updateScore(0);
		});
	};
};