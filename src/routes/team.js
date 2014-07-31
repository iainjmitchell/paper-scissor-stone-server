var TeamController = function(){
	var teams = [{name: 'a team'}];

	this.get = function(request, response){
		response.json(teams);
	};	
};

module.exports = function(website){
	var controller = new TeamController();
	website.get('/Team', controller.get);
};