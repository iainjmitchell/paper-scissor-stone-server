var Game = require('../../src/game/game.js');
require('chai').should();

var MockCompetitor = function(moves){
	var movesMade = 0;
	this.matchesWon = 0;
	this.getMove = function(){
		movesMade++;
		return moves[movesMade-1];
	};
	this.win = function(){
		this.matchesWon++;
	};
	this.matchStarted = function(){};
};


describe('When a game of paper, scissors, stone is started', function(){
	var alwaysStone = alwaysReturns('stone'),
		alwaysPaper = alwaysReturns('paper'),
		alwaysScissors = alwaysReturns('scissors'),
		halfPaperHalfStone = mixOf('paper', 'stone'),
		rules = {
			"paper" : { beats : ["stone"] },
			"stone" : { beats : ["scissors"]},
			"scissors": { beats : ["paper"]}
		};

	describe('And a competitor is registered', function(){
		describe('and round is started', function(){
			it('Then competitor wins is 0 (there is no one to fight)', function(){
				var mockCompetitor = new MockCompetitor();
				new Game(rules)
					.addCompetitor(mockCompetitor)
					.startRound();
				mockCompetitor.matchesWon.should.equal(0);
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
						win : function(){},
						getMove : function(){}
					};
				new Game(rules)
					.addCompetitor(mockCompetitor)
					.addCompetitor(mockCompetitor)
					.startRound();
				competitorsNotifiedOfRoundstarting.should.equal(2);
			});

			it('Then both competitors have 0 wins', function(){
				var noMoves = [],
					competitor1 = new MockCompetitor(noMoves),
					competitor2 = new MockCompetitor(noMoves);	
				new Game(rules)
					.addCompetitor(competitor1)
					.addCompetitor(competitor2)
					.startRound();
				competitor1.matchesWon.should.equal(0);
				competitor2.matchesWon.should.equal(0);
			});
		});
	});

	describe('And two competitors are registered', function(){
		describe('And the second one returns no moves', function(){
			describe('and round is started', function(){
				var noMoves = [],
					competitor1 = new MockCompetitor(alwaysStone),
					competitor2 = new MockCompetitor(noMoves);	
				
				new Game(rules)
					.addCompetitor(competitor1)
					.addCompetitor(competitor2)
					.startRound();
					
				it('Then competitor1 registers a win', function(){
					competitor1.matchesWon.should.equal(1);
				});

				it('Then competitor2 has 0 wins', function(){
					competitor2.matchesWon.should.equal(0);
				});
			});
		});

		describe('And the first one returns no moves', function(){
			describe('and round is started', function(){
				var noMoves = [],
					competitor1 = new MockCompetitor(noMoves),
					competitor2 = new MockCompetitor(alwaysStone);	
				
				new Game(rules)
					.addCompetitor(competitor1)
					.addCompetitor(competitor2)
					.startRound();
					
				it('Then competitor2 registers a win', function(){
					competitor2.matchesWon.should.equal(1);
				});

				it('Then competitor1 has 0 wins', function(){
					competitor1.matchesWon.should.equal(0);
				});
			});
		});

		describe('And both of which return the same move', function(){
			describe('and round is started', function(){
				var competitor1 = new MockCompetitor(alwaysStone),
					competitor2 = new MockCompetitor(alwaysStone);	
				new Game(rules)
					.addCompetitor(competitor1)
					.addCompetitor(competitor2)
					.startRound();

				it('Then competitor1 does not register a win', function(){
					competitor1.matchesWon.should.equal(0);
				});

				it('Then competitor2 does not register a win', function(){
					competitor2.matchesWon.should.equal(0);
				});
			});
		});

		describe('And the first always a values stone', function(){
			describe('And the second always returns paper', function(){
				describe('and round is started', function(){
					var competitor1 = new MockCompetitor(alwaysStone),
						competitor2 = new MockCompetitor(alwaysPaper);	
					new Game(rules)
						.addCompetitor(competitor1)
						.addCompetitor(competitor2)
						.startRound();

					it('Then competitor1 does not register a win', function(){
						competitor1.matchesWon.should.equal(0);
					});

					it('Then competitor2 does register a win', function(){
						competitor2.matchesWon.should.equal(1);
					});
				});
			});
		});

		describe('And the first returns half paper and half stone', function(){
			describe('And the second always returns paper', function(){
				describe('and round is started', function(){
					var competitor1 = new MockCompetitor(halfPaperHalfStone),
						competitor2 = new MockCompetitor(alwaysPaper);	
					new Game(rules)
						.addCompetitor(competitor1)
						.addCompetitor(competitor2)
						.startRound();

					it('Then competitor1 does not register a win', function(){
						competitor1.matchesWon.should.equal(0);
					});

					it('Then competitor2 does register a win', function(){
						competitor2.matchesWon.should.equal(1);
					});
				});
			});
		});

		describe('And three competitors are registered who return no moves', function(){
			describe('and round is started', function(){
				it('Then first competitor is notified twice of round starting', function(){
					var competitorsNotifiedOfRoundstarting = 0,
						mockCompetitor = {
							matchStarted : function(){
								competitorsNotifiedOfRoundstarting++;
							},
							win : function(){},
							getMove : function(){}
						};
					new Game(rules)
						.addCompetitor(mockCompetitor)
						.addCompetitor(new MockCompetitor([]))
						.addCompetitor(new MockCompetitor([]))
						.startRound();
					competitorsNotifiedOfRoundstarting.should.equal(2);
				});

				// it('Then second competitor is notified twice of round starting', function(){
				// 	var competitorsNotifiedOfRoundstarting = 0,
				// 		mockCompetitor = {
				// 			matchStarted : function(){
				// 				competitorsNotifiedOfRoundstarting++;
				// 			},
				// 			win : function(){},
				// 			getMove : function(){}
				// 		};
				// 	new Game(rules)
				// 		.addCompetitor(new MockCompetitor([]))
				// 		.addCompetitor(mockCompetitor)
				// 		.addCompetitor(new MockCompetitor([]))
				// 		.startRound();
				// 	competitorsNotifiedOfRoundstarting.should.equal(2);
				// });
			});
		});
	});

	function mixOf(move1, move2){
		var count = 200,
			moves = [];
		for(count; count > 0; count--){	
			var move = (count % 2 === 0) ? move1 : move2;
			moves.push(move);
		};
		return moves;
	}

	function alwaysReturns(move){
		var count = 200,
			moves = [];
		for(count; count > 0; count--){	
			moves.push(move);
		};
		return moves;
	}
});

