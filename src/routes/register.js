var BotRegistrationController = require('../controller/BotRegistrationController');

module.exports = function(website){
	var controller = new BotRegistrationController();
	website.get('/register', controller.get);
};