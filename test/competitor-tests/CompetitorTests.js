require('chai').should();

var FakeEventStore = function(){
	this.events = {};
	
	this.notify = function(eventName, event){
		this.events[eventName] = event;
	};
};


describe('When a competitor is created', function(){
	it('Then a new competitor event is raised with name of competitor', function(){
		var competitorName = 'a Name ' + Math.random(),
			fakeEventStore = new FakeEventStore();
		new Competitor(fakeEventStore, {name : competitorName});
		fakeEventStore.events['newCompetitor'].name.should.equal(competitorName);
	});
});

var Competitor = function(eventStore, competitorDetails){
	var NEW_COMPETITOR_EVENT = 'newCompetitor';


	function init(){
		eventStore.notify(NEW_COMPETITOR_EVENT, { name : competitorDetails.name});
	}

	init();
};