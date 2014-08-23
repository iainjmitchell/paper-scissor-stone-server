var CompetitorMatches = function(matchFactory, onCompletedMatches, competitor, opponents){
	this.play = function(){
		var count = 0;
		for (count; count < opponents.length; count++){
			var opponent = opponents[count];
			matchFactory.create(competitor, opponent).start();
		}
		onCompletedMatches();
	};
};

module.exports = CompetitorMatches;