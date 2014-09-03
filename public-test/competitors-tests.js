(function(test, asyncTest, $, undefined){
	test('When Competitor added, then new competitor is added to competitorsElement', function(){
		var id = 12341231313,
			eventStore = new EventStore();
		$('#competitors').competitors(eventStore);
		eventStore.notify('newCompetitor', { id : id });
		ok($('#competitors ul li div#'+id).length === 1);
	});

	test('When Competitor added, then competitor name is displayed', function(){
		var id = 12341299999,
			name = 'a Name' + Math.random(),
			eventStore = new EventStore();
		$('#competitors').competitors(eventStore);
		eventStore.notify('newCompetitor', { id : id, name : name});
		equal($('#competitors ul li div#'+id).find('span.name').text(), name);
	});
	test('When Competitor added, then competitor gravatar image is displayed', function(){
		var id = 34324241299999,
			gravatarUri = 'http://'+Math.random()+'/',
			eventStore = new EventStore();
		$('#competitors').competitors(eventStore);
		eventStore.notify('newCompetitor', { id : id, gravatarUri : gravatarUri});
		equal($('#competitors ul li div#'+id).find('img').prop('src'), gravatarUri);
	});
})(QUnit.test, QUnit.asyncTest, jQuery);



(function($, undefined){
	$.fn.competitors = function(eventStore){
		return this.each(function(){
			new Competitors(this, eventStore);
		});
	};

	var Competitors = function(element, eventStore){
		var competitorsList,
			competitorElementFactory = new CompetitorElementFactory();
			

		function init(){
			$(element).append($('<ul>'));
			competitorsList = $(element).find('ul');
			eventStore.on('newCompetitor', add);
		}

		function add(competitor){
			var competitorElement = competitorElementFactory.create(competitor);
			competitorsList.append(competitorElement);
		}

		init();
	};

	var CompetitorElementFactory = function(){
		var competitorElementTemplate = '<li><div><img><span class="name"></span></div></li>';
		
		this.create = function(competitor){
			var competitorElement = $(competitorElementTemplate);
			competitorElement
				.find('div')
					.prop('id', competitor.id)
					.end()
				.find('.name')
					.text(competitor.name)
					.end()
				.find('img')
					.prop('src', competitor.gravatarUri);
			return competitorElement;
		};
	};
})(jQuery);
