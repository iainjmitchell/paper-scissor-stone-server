var BotController = function(game){
	var botValidator = new BotValidator();

	this.add = function(request, response){
		var bot = request.body;
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