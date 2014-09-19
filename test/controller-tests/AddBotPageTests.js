var BotRegistrationController = require('../../src/controller/BotRegistrationController');
require('chai').should();

describe('When displaying the register bot page', function(){
	it('Then the correct page is rendered', function(done){
		var botRegistrationController = new BotRegistrationController();
		botRegistrationController.get({}, {
			render : function(pageName){
				pageName.should.equal('register');
				done();
			}
		});
	});
});