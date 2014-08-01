var TeamController = require('../../src/controller/TeamController');
require('chai').should();

describe('Team Controller Tests', function(){
	var FAKE_REQUEST = {};

	describe('When no teams added', function(){
		describe('And teams are retrieved', function(){
			it('Then no teams are returned in response', function(done){
				var mockResponse = {
						json : function(teams){
							teams.should.eql([]);
							done();
						}
					},
					teamController = new TeamController();
				teamController.get(FAKE_REQUEST, mockResponse);
			});
		});
	});
});