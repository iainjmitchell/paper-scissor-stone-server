var EventStore = require('../../src/infrastructure/EventStore'),
	IndexController = require('../../src/controller/IndexController');
require('chai').should();

var fakeIO = {
	emit : function(){}
};

var MockResponse = function(){
	this.render = function(page, model){
		this.page = page;
		this.model = model;
	};
};

var fakeRequest = {};

describe('Given that user loads the index page', function(){
	it('Then the index page is displayed', function(){
		var mockResponse = new MockResponse();
		new IndexController(new EventStore(fakeIO)).get(fakeRequest, mockResponse);
		mockResponse.page.should.equal('index');
	});

	describe('When game has not started', function(){
		it('Then no competitors are returned', function(){
			var mockResponse = new MockResponse();
			new IndexController(new EventStore(fakeIO)).get(fakeRequest, mockResponse);
			mockResponse.model.competitors.length.should.equal(0);
		});
	});

	describe('When game has started', function(){
		describe('And one competitor has been registered', function(){
			it('Then competitor is returned', function(){
				var mockResponse = new MockResponse(),
					competitor = {},
					eventStore = new EventStore(fakeIO);
				var indexController = new IndexController(eventStore);
				eventStore.notify('newCompetitor', competitor);
				indexController.get(fakeRequest, mockResponse);
				mockResponse.model.competitors[0].should.equal(competitor);
			});
		});
	});
});

