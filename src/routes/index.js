var IndexController = require('../controller/TeamController');

module.exports = function(website){
	var controller = new IndexController();
	website.get('/', controller.get);
};