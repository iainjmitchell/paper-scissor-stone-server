require('chai').should();

describe('When a game of paper, scissors, stone is started', function(){
	describe('And a competitor is registered', function(){
		it('Then the display is updated with the competitor', function(done){
			var newCompetitor = {},
				mockDisplay = {
					showCompetitor : function(competitor){
						competitor.should.equal(newCompetitor);
						done();
					}
				};	
			new Game(mockDisplay).addCompetitor(newCompetitor);
		});
	});
});

var Game = function(display){
	this.addCompetitor = function(competitor){
		display.showCompetitor(competitor);
	};
};