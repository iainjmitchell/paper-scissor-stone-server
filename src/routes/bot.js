var BotController = require('../controller/BotController');

module.exports = function(website){
	var controller = new BotController();
	website.get('/Bot', controller.get);
};