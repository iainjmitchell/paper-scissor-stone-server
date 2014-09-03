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
