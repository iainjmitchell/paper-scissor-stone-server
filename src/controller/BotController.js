var BotController = function(){
	var teams = [],
		botValidator = new BotValidator();

	this.get = function(request, response){
		response.json(teams);
	};

	this.add = function(request, response){
		var bot = request.body;
		if (botValidator.validate(bot)){
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