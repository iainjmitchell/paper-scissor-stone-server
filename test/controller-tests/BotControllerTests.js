var BotController = require('../../src/controller/BotController');
var HijackDI = require('hijackdi'),
	hijackDI = new HijackDI('../../../src/controller/BotController');
require('chai').should();

var fakeEventStore = {
	notify : function(){}
};

describe('Bot Controller Tests', function(){
	describe('When created', function(){
		it('Then competitor factory is created with event store', function(done){
			var mockCompetitorFactory = new MockCompetitorFactory(),
				mocks = {
					'../../../src/competitor/CompetitorFactory' : function(eventStore){
						eventStore.should.equal(fakeEventStore);
						done();
					}
				};

			hijackDI.sandbox(mocks, function(BotController){
				new BotController(new MockGame(),fakeEventStore);
			});
		});
	});

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
					botController = new BotController(new MockGame(), fakeEventStore);
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
					botController = new BotController(new MockGame(), fakeEventStore);
				botController.add({body : bot}, mockResponse);
			});

			it('Then bot is not added to competitors', function(){
				var mockGame = new MockGame(),
					botController = new BotController(mockGame, fakeEventStore);	
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
					botController = new BotController(new MockGame(), fakeEventStore);
				botController.add({body : bot}, mockResponse);
			});

			it('Then competitor is created from bot', function(){
				var mockCompetitorFactory = new MockCompetitorFactory(),
					mocks = {
						'../../../src/competitor/CompetitorFactory' : function(){
							return mockCompetitorFactory;
						}
					};

				hijackDI.sandbox(mocks, function(BotController){
					var botController = new BotController(new MockGame(),fakeEventStore);
					botController.add({body : bot}, {send: function(){}});
				});
				mockCompetitorFactory.bot.should.equal(bot);
			});

			it('Then created competitor is added to game', function(){
				var fakeCompetitor = {},
					mockGame = new MockGame(),
					stubs = {
						'../../../src/competitor/CompetitorFactory' : function(){
							return {
								create : function(){
									return fakeCompetitor;
								}
							};
						}
					};

				hijackDI.sandbox(stubs, function(BotController){
					var botController = new BotController(mockGame,fakeEventStore);
					botController.add({body : bot}, {send: function(){}});
				});
				mockGame.added.should.eql([fakeCompetitor]);
			});
		});
	});
});

var MockCompetitorFactory = function(){
	this.create = function(bot){	
		this.bot = bot;
	};
};

var MockGame = function(){
	this.added = [];
	this.addCompetitor = function(competitor){
		this.added.push(competitor);
	};
};