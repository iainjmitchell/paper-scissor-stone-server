var TeamController = function(){
	var teams = [{name: 'a team'}];

	this.get = function(request, response){
		response.json(teams);
	};	
};

module.exports = TeamController; 