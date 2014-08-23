var CompetitorScore = function(eventStore, competitorId){
	var SCORE_EVENT = 'score',
		score = {
			id : competitorId,
			total : 0,
			round : 0
		};

	this.increment = function(){
		score.total++;
		score.round++;
		eventStore.notify(SCORE_EVENT, score);
	};

	this.newRound = function(){
		score.round = 0;
	};
};

module.exports = CompetitorScore;