var TeamController = function(){
	var teams = [];

	this.get = function(request, response){
		response.json(teams);
	};

	this.add = function(request, response){
		if (!!request.body.name && !!request.body.uri){
			response.send(200);
		}
		else{
			response.send(422);
		}
	};
};

module.exports = TeamController; 