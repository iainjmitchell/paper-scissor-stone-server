var IndexController = function(){
	this.get = function(request, response){
		response.render('index', {
			title : 'Paper Scissor Stone tournament'
		});
	};
};

module.exports = function(website){
	var controller = new IndexController();
	website.get('/', controller.get);
};