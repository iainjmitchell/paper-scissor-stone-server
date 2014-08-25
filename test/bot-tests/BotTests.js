var HijackDI = require('hijackdi'),
	hijackDI = new HijackDI('../../../src/bot/Bot.js');
require('chai').should();

var MockHttp = function(){
	this.requests = [];
	this.gets = [];
	this.get = function(data){
		this.gets.push(data);
	};
	this.request = function(data){
		this.requests.push(data);
	};
};

describe('When bot is created at uri', function(){
	describe('And is notified of start of round', function(){
		it('Then a request is sent bot uri start round', function(){
			var botUri = 'http://' + Math.random(),
				mockHttp = new MockHttp(),
				mocks = {
					'httpsync' : mockHttp
				};

			hijackDI.sandbox(mocks, function(Bot){
				new Bot(botUri).startRound();
			});
			mockHttp.requests[0].url.should.equal(botUri + '/round');
		});

		it('Then the request is POSTed', function(){
			var mockHttp = new MockHttp(),
				mocks = {
					'httpsync' : mockHttp
				};

			hijackDI.sandbox(mocks, function(Bot){
				new Bot('').startRound();
			});
			mockHttp.requests[0].method.should.equal('POST');
		});
	});

	describe('And is notified of start of match', function(){
		it('Then a request is sent bot uri start match', function(){
			var botUri = 'http://' + Math.random(),
				mockHttp = new MockHttp(),
				mocks = {
					'httpsync' : mockHttp
				};

			hijackDI.sandbox(mocks, function(Bot){
				new Bot(botUri).startMatch();
			});
			mockHttp.requests[0].url.should.equal(botUri + '/match');
		});

		it('Then the request is POSTed', function(){
			var mockHttp = new MockHttp(),
				mocks = {
					'httpsync' : mockHttp
				};

			hijackDI.sandbox(mocks, function(Bot){
				new Bot('').startMatch();
			});
			mockHttp.requests[0].method.should.equal('POST');
		});
	});

	describe('And is notified of win', function(){
		it('Then a request is sent bot uri for win', function(){
			var botUri = 'http://' + Math.random(),
				mockHttp = new MockHttp(),
				mocks = {
					'httpsync' : mockHttp
				};

			hijackDI.sandbox(mocks, function(Bot){
				new Bot(botUri).win();
			});
			mockHttp.requests[0].url.should.equal(botUri + '/win');
		});

		it('Then the request is POSTed', function(){
			var mockHttp = new MockHttp(),
				mocks = {
					'httpsync' : mockHttp
				};

			hijackDI.sandbox(mocks, function(Bot){
				new Bot('').win();
			});
			mockHttp.requests[0].method.should.equal('POST');
		});
	});
});