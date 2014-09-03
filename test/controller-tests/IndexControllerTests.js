require('chai').should();

var fakeEventStore = {
	notify : function(){}
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
		new IndexController().get(fakeRequest, mockResponse);
		mockResponse.page.should.equal('index');
	});

	// describe('When game has not started', function(){
	// 	it('Then no competitors are returned', function(){

	// 	});
	// });
});

var IndexController = function(){
	this.get = function(request, response){
		response.render('index');
	};
};