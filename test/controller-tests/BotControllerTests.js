var BotController = require('../../src/controller/BotController');
require('chai').should();

describe('Bot Controller Tests', function(){
	var FAKE_REQUEST = {};

	describe('When no bots added', function(){
		describe('And bots are retrieved', function(){
			it('Then no bots are returned in response', function(done){
				var mockResponse = {
						json : function(bots){
							bots.should.eql([]);
							done();
						}
					},
					botController = new BotController();
				botController.get(FAKE_REQUEST, mockResponse);
			});
		});
	});

	describe('When one team is added', function(){
		describe('missing a name', function(){
			it('Then team is rejected with 422 (Unprocessable)', function(done){
				var team = {
						uri : 'http://bob.com'
					},
					mockResponse = {
						send : function(statusCode){
							statusCode.should.equal(422);
							done();
						}
					},
					botController = new BotController();
				botController.add({body : team}, mockResponse);
			});
		});

		describe('missing a uri', function(){
			it('Then team is rejected with 422 (Unprocessable)', function(done){
				var team = {
						name : 'helloWorld'
					},
					mockResponse = {
						send : function(statusCode){
							statusCode.should.equal(422);
							done();
						}
					},
					botController = new BotController();
				botController.add({body : team}, mockResponse);
			});
		});

		describe('has a name and a uri', function(){
			it('Then team is NOT rejected', function(done){
				var team = {
						name : 'helloWorld2',
						uri: 'http://aUri'
					},
					mockResponse = {
						send : function(statusCode){
							statusCode.should.equal(200);
							done();
						}
					},
					botController = new BotController();
				botController.add({body : team}, mockResponse);
			});
		});

		// describe('And bots are retrieved', function(){
		// 	it('Then team is returned in response', function(done){
		// 		var mockResponse = {
		// 				json : function(bots){
		// 					bots.should.eql([]);
		// 					done();
		// 				}
		// 			},
		// 			botController = new BotController();
		// 		botController.get(FAKE_REQUEST, mockResponse);
		// 	});
		// });
	});
});