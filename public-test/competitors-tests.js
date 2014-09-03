(function(test, asyncTest, $, undefined){
	test('When Competitor added, then new competitor is added to competitorsElement', function(){
		var eventStore = new EventStore();
		$('#competitors').competitors(eventStore);
		eventStore.notify('newCompetitor', {});
		ok($('#competitors ul li').length === 1);
	});

	var EventStore = function(){
		var events = {};

		this.notify = function(eventName, event){
			var count = 0,
				callbacks = events[eventName];
			if (!!callbacks){
				for(count; count < callbacks.length; callbacks++){
					callbacks[0](event);
				}
			}
		};

		this.on = function(eventName, callback){
			var callbacks = events[eventName] || [];
			callbacks.push(callback);
			events[eventName] = callbacks;
		};
	};
})(QUnit.test, QUnit.asyncTest, jQuery);



(function($, undefined){
	$.fn.competitors = function(eventStore){
		return this.each(function(){
			new Competitors(this, eventStore);
		});
	};

	var Competitors = function(element, eventStore){
		$(element).append($('<ul>'));
		var competitorsList = $(element).find('ul');
		

		eventStore.on('newCompetitor', function(competitor){
			competitorsList.append('<li>')
		});
	};
})(jQuery);
