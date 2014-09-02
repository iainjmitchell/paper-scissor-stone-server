var CompetitorFactory = require('../competitor/CompetitorFactory');

var BotController = function(game, eventStore){
	var botValidator = new BotValidator(),
		competitorFactory = new CompetitorFactory(eventStore);

	this.add = function(request, response){
		var bot = request.body;
		competitorFactory.create(bot);

		if (botValidator.validate(bot)){
			game.addCompetitor(bot);
			response.send(200);
		}
		else{
			response.send(422);
		}
	};
};

var BotValidator = function(){
	this.validate = function(bot){
		return (!!bot.name && !!bot.uri);
	};
};

module.exports = BotController; 