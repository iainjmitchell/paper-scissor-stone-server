var BotController = require('../../src/controller/BotController');
require('chai').should();

describe('Bot Controller Tests', function(){
	describe('When one bot is added', function(){
		describe('missing a name', function(){
			it('Then bot is rejected with 422 (Unprocessable)', function(done){
				var bot = {
						uri : 'http://bob.com'
					},
					mockResponse = {
						send : function(statusCode){
							statusCode.should.equal(422);
							done();
						}
					},
					botController = new BotController(new MockGame());
				botController.add({body : bot}, mockResponse);
			});
		});

		describe('missing a uri', function(){
			var bot = {
					name : 'helloWorld'
				};

			it('Then bot is rejected with 422 (Unprocessable)', function(done){
				var mockResponse = {
						send : function(statusCode){
							statusCode.should.equal(422);
							done();
						}
					},
					botController = new BotController(new MockGame());
				botController.add({body : bot}, mockResponse);
			});

			it('Then bot is not added to competitors', function(){
				var mockGame = new MockGame(),
					botController = new BotController(mockGame);	
				botController.add({body : bot}, {send: function(){}});
				mockGame.added.length.should.equal(0);
			});
		});

		describe('has a name and a uri', function(){
			var bot = {
					name : 'helloWorld2' + Math.random(),
					uri: 'http://aUri/' + Math.random() 
				};

			it('Then bot is NOT rejected', function(done){
				var mockResponse = {
						send : function(statusCode){
							statusCode.should.equal(200);
							done();
						}
					},
					botController = new BotController(new MockGame());
				botController.add({body : bot}, mockResponse);
			});

			describe('And bots are retrieved', function(){
				it('Then bot is added to game', function(){
					var mockGame = new MockGame(),
					botController = new BotController(mockGame);	
					botController.add({body : bot}, {send: function(){}});
					mockGame.added.should.eql([bot]);
				});
			});
		});
	});
});

var MockGame = function(){
	this.added = [];
	this.addCompetitor = function(competitor){
		this.added.push(competitor);
	};
};