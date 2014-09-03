var IndexController = function(eventStore){
	var competitors = new CompetitorRepository(eventStore);

	this.get = function(request, response){
		response.render('index', {
			competitors : competitors.get()
		});
	};
};

var CompetitorRepository = function(eventStore){
	var competitors = [];

	function init(){
		eventStore.on('newCompetitor', function(competitor){
			competitors.push(competitor)
		});
	}

	this.get = function(){
		return competitors;
	};

	init();
};

module.exports = IndexController;