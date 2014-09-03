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