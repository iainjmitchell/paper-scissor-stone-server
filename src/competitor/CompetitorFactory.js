var Bot = require('../bot/Bot.js'),
	Competitor = require('./Competitor.js'),
	uuid = require('node-uuid');

var CompetitorFactory = function(eventStore){
	this.create = function(competitor){
		var bot = new Bot(competitor.uri),
			competitorDetails = {
				id : uuid.v4(),
				name : competitor.name,
				email : competitor.email
			};
		return new Competitor(eventStore, bot, competitorDetails);
	};
};

module.exports = CompetitorFactory;