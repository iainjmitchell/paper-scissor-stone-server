var BotController = function(){
	var teams = [];

	this.get = function(request, response){
		response.json(teams);
	};

	this.add = function(request, response){
		var team = request.body;
		if (!!team.name && !!team.uri){
			response.send(200);
		}
		else{
			response.send(422);
		}
	};
};

module.exports = BotController; 