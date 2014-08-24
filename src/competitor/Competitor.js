var CompetitorScore = require('./CompetitorScore'),
	Gravatar = require('gravatar');

var Competitor = function(eventStore, bot, competitorDetails){
	var NEW_COMPETITOR_EVENT = 'newCompetitor',
		NEW_ROUND_EVENT = 'newRoundStarted',
		round = {
			id : competitorDetails.id,
			number : 0
		},
		competitorScore = new CompetitorScore(eventStore, competitorDetails.id);

	function init(){
		var eventDetails = {
			id : competitorDetails.id,
			name : competitorDetails.name,
			gravatarUri : Gravatar.url(competitorDetails.email || '')
		};
		eventStore.notify(NEW_COMPETITOR_EVENT, eventDetails);
	}

	this.roundStarted = function(){
		round.number++;
		competitorScore.newRound();
		bot.startRound();
		eventStore.notify(NEW_ROUND_EVENT, round);
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