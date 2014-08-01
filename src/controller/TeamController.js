var TeamController = function(){
	var teams = [];

	this.get = function(request, response){
		response.json(teams);
	};

	this.add = function(request, response){
		response.send(422);
	};
};

module.exports = TeamController; 