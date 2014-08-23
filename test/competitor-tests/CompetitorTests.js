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

var FakeBot = function(moves){
	this.startRound = function(){

	};
	this.startMatch = function(){

	};
	this.move = function(){
		return moves.pop();
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

	it('Then a new competitor event is raised with id of competitor', function(){
		var competitorId = Math.random(),
			fakeEventStore = new FakeEventStore();
		new Competitor(fakeEventStore, new MockBot(), {id : competitorId});
		fakeEventStore.events['newCompetitor'].id.should.equal(competitorId);
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

		describe('And a win is recorded', function(){
			it('Then an event is raised stating a score has been registered for competitor by id', function(){
				var competitorId = Math.random(),
					fakeEventStore = new FakeEventStore();
				new Competitor(fakeEventStore, new MockBot(), {id : competitorId})
					.roundStarted()
					.win();
				fakeEventStore.events['score'].id.should.equal(competitorId);
			});

			it('Then an event is raised stating a score of round is 1', function(){
				var fakeEventStore = new FakeEventStore();
				new Competitor(fakeEventStore, new MockBot(), {})
					.roundStarted()
					.win();
				fakeEventStore.events['score'].round.should.equal(1);
			});
			describe('And another win is recorded', function(){
				it('Then an event is raised stating a score of round is 2', function(){
					var fakeEventStore = new FakeEventStore();
					new Competitor(fakeEventStore, new MockBot(), {})
						.roundStarted()
						.win()
						.win();
					fakeEventStore.events['score'].round.should.equal(2);
				});
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

	describe('When a move is requested', function(){
		it('Then the move of the bot is returned', function(){
			var botMove = 'paper'+Math.random(),
				fakeBot = new FakeBot([botMove]),
				competitor = new Competitor(new FakeEventStore(), fakeBot, {});
			competitor.getMove().should.equal(botMove);
		});
	});

	
});

var Competitor = function(eventStore, bot, competitorDetails){
	var NEW_COMPETITOR_EVENT = 'newCompetitor',
		NEW_ROUND_EVENT = 'newRoundStarted',
		SCORE_EVENT = 'score',
		numberOfRounds = 0,
		score = 0;

	function init(){
		var eventDetails = {
			id : competitorDetails.id,
			name : competitorDetails.name
		};
		eventStore.notify(NEW_COMPETITOR_EVENT, eventDetails);
	}

	this.roundStarted = function(){
		numberOfRounds++;
		bot.startRound();
		eventStore.notify(NEW_ROUND_EVENT, {number : numberOfRounds});
		return this;
	};

	this.matchStarted = function(){
		bot.startMatch();
		return this;
	};
	
	this.getMove = bot.move;

	this.win = function(){
		score++;
		var eventDetails = {
			id : competitorDetails.id, 
			round : score
		};
		eventStore.notify(SCORE_EVENT, eventDetails);
		return this;
	};

	init();
};