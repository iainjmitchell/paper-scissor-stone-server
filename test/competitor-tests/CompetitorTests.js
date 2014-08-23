require('chai').should();

var FakeEventStore = function(){
	this.events = {};
	
	this.notify = function(eventName, event){
		this.events[eventName] = event;
	};
};

var MockBot = function(){
	this.startRound = function(){

	};
	this.startMatch = function(){

	};
	this.move = function(){

	};
	this.win = function(){

	};
};


describe('When a competitor is created', function(){
	it('Then a new competitor event is raised with name of competitor', function(){
		var competitorName = 'a Name ' + Math.random(),
			fakeEventStore = new FakeEventStore();
		new Competitor(fakeEventStore, new MockBot(), {name : competitorName});
		fakeEventStore.events['newCompetitor'].name.should.equal(competitorName);
	});

	//TODO email to gravitar hash

	describe('When a round is started', function(){
		it('Then a new round started event is raised with round number 1', function(){
			var fakeEventStore = new FakeEventStore();
			new Competitor(fakeEventStore, new MockBot(), {})
				.roundStarted();
			fakeEventStore.events['newRoundStarted'].number.should.equal(1);
		});

		it('Then bot is informed of round start', function(done){
			var mockBot = new MockBot();
			mockBot.startRound = done;
			new Competitor(new FakeEventStore(), mockBot, {}).roundStarted();
		});

		describe('When another round is started', function(){
			it('Then a new round started event is raised with round number 2', function(){
				var fakeEventStore = new FakeEventStore();
				new Competitor(fakeEventStore, new MockBot(), {})
					.roundStarted()
					.roundStarted();
				fakeEventStore.events['newRoundStarted'].number.should.equal(2);
			});
		});
	});

	describe('When a match is started', function(){
		it('Then bot is informed of match start', function(done){
			var mockBot = new MockBot();
			mockBot.startMatch = done;
			new Competitor(new FakeEventStore(), mockBot, {}).matchStarted();
		});
	});
});

var Competitor = function(eventStore, bot, competitorDetails){
	var NEW_COMPETITOR_EVENT = 'newCompetitor',
		NEW_ROUND_EVENT = 'newRoundStarted',
		numberOfRounds = 0;

	function init(){
		eventStore.notify(NEW_COMPETITOR_EVENT, { name : competitorDetails.name});
	}

	this.roundStarted = function(){
		numberOfRounds++;
		bot.startRound();
		eventStore.notify(NEW_ROUND_EVENT, {number : numberOfRounds});
		return this;
	};

	this.matchStarted = bot.startMatch;

	init();
};