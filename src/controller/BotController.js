var CompetitorFactory = require('../competitor/CompetitorFactory');

var BotController = function(game, eventStore){
	var botValidator = new BotValidator(),
		competitorFactory = new CompetitorFactory(eventStore);

	this.add = function(request, response){
		var bot = request.body;

		if (botValidator.validate(bot)){
			var competitor = competitorFactory.create(bot);
			game.addCompetitor(competitor);
			response.send(200);
		}
		else{
			response.send(422);
		}
	};
};

var BotValidator = function(){
	var addedBots = [];
	this.validate = function(bot){
		if (addedBots.indexOf(bot.name) === -1){
			addedBots.push(bot.name);
			return (!!bot.name && !!bot.uri);
		}
		return false;
	};
};

module.exports = BotController; 