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
	this.validate = function(bot){
		return (!!bot.name && !!bot.uri);
	};
};

module.exports = BotController; 