var MatchScoreboard = function(opponent1, opponent2, playNextPoint){
	var SCORING_RULES = {
			WIN_POINT : 100,
			MAX_DRAWN_POINTS : 200
		},
		drawn_points = 0,
		scores = [
			{ opponent : opponent1, amount : 0 },
			{ opponent : opponent2, amount : 0 }
		];

	this.pointScoredBy = function(opponent){
		scores.forEach(function(score){
			if (score.opponent === opponent){
				score.amount++;
				if (score.amount === SCORING_RULES.WIN_POINT){
					score.opponent.win();
				}
				else playNextPoint();
			}
		});
	};

	this.draw = function(){
		drawn_points++;
		if (drawn_points !== SCORING_RULES.MAX_DRAWN_POINTS){
			playNextPoint();
		}
	};
};

module.exports = MatchScoreboard;