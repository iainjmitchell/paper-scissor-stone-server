var IndexController = function(){
	this.get = function(request, response){
		response.render('index', {
			title : 'Paper Scissor Stone tournament'
		});
	};
};

module.exports = function(website, game, eventStore){
	var controller = new IndexController(website, game, eventStore);
	website.get('/', controller.get);
};