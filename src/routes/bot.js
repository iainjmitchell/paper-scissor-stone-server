var BotController = require('../controller/BotController');

module.exports = function(website, game){
	var controller = new BotController(game);
	website.get('/Bot', controller.get);
};