var CompetitorScore = require('./CompetitorScore');

var Competitor = function(eventStore, bot, competitorDetails){
	var NEW_COMPETITOR_EVENT = 'newCompetitor',
		NEW_ROUND_EVENT = 'newRoundStarted',
		numberOfRounds = 0,
		competitorScore = new CompetitorScore(eventStore, competitorDetails.id);

	function init(){
		var eventDetails = {
			id : competitorDetails.id,
			name : competitorDetails.name
		};
		eventStore.notify(NEW_COMPETITOR_EVENT, eventDetails);
	}

	this.roundStarted = function(){
		numberOfRounds++;
		competitorScore.newRound();
		bot.startRound();
		eventStore.notify(NEW_ROUND_EVENT, {number : numberOfRounds});
		return this;
	};

	this.matchStarted = function(){
		bot.startMatch();
		return this;
	};
	
	this.getMove = bot.move;

	this.win = function(){
		competitorScore.increment();
		bot.win();
		return this;
	};

	init();
};

module.exports = Competitor;