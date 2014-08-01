var IndexController = function(){
	this.get = function(request, response){
		response.send(200);
	};
};

module.exports = function(website){
	var controller = new IndexController();
	website.get('/', controller.get);
};