var IndexController = require('../controller/IndexController');

module.exports = function(website, game, eventStore){
	var controller = new IndexController(eventStore);
	website.get('/', controller.get);
};