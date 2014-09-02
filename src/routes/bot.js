var BotController = require('../controller/BotController');

module.exports = function(website, game, eventStore){
	var controller = new BotController(game, eventStore);
	website.put('/Bot', controller.add);
};