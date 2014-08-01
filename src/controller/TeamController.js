var TeamController = function(){
	var teams = [];

	this.get = function(request, response){
		response.json(teams);
	};	
};

module.exports = TeamController; 