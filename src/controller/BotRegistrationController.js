var BotRegistrationController = function(){
	this.get = function(request, response){
		response.render('register');
	};
};

module.exports = BotRegistrationController;