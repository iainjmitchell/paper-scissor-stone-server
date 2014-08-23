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

	//TODO email to gravitar hash

	describe('When a round is started', function(){
		it('Then a new round started event is raised with round number 1', function(){
			var fakeEventStore = new FakeEventStore();
			new Competitor(fakeEventStore, {})
				.roundStarted();
			fakeEventStore.events['newRoundStarted'].number.should.equal(1);
		});
	});
});

var Competitor = function(eventStore, competitorDetails){
	var NEW_COMPETITOR_EVENT = 'newCompetitor';

	function init(){
		eventStore.notify(NEW_COMPETITOR_EVENT, { name : competitorDetails.name});
	}

	this.roundStarted = function(){
		eventStore.notify('newRoundStarted', {number : 1});
	};

	init();
};