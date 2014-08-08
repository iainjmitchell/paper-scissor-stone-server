(function(test, asyncTest, $, undefined){
	test('requests contestant bots from server', function(assert){
		$.ajax = function(options){
			assert.equal(options.url, '/scores');
		};
		$('#bots').scoreboard();
	});

	test('requests contestant bots as JSON', function(assert){
		$.ajax = function(options){
			assert.equal(options.dataType, 'json');
		};
		$('#bots').scoreboard();
	});

	test('one bot registered is added to scoreboard', function(assert){
		$.ajax = function(options){
			options.success([{name: 'aBot'}]);
		};
		$('#bots').scoreboard();
		var displayedBots = $('#bots').find('.bot').length;
		assert.equal(displayedBots, 1);
	});

	test('multiple bots registered are added to scoreboard', function(assert){
		$.ajax = function(options){
			options.success([{name: 'aBot'}, {name: 'anotherBot'}]);
		};
		$('#bots').scoreboard();
		var displayedBots = $('#bots').find('.bot').length;
		assert.equal(displayedBots, 2);
	});

	test('one bot registered is added to scoreboard with name', function(assert){
		var name = "aName" + Math.random();
		$.ajax = function(options){
			options.success([{name: name}]);
		};
		$('#bots').scoreboard();
		var displayedBots = $('#bots').find('.bot');
		assert.equal(displayedBots.find('.name').text(), name);
	});
})(QUnit.test, QUnit.asyncTest, jQuery);

(function($, undefined){
	$.fn.scoreboard = function(){
		return this.each(function(){
			new Scoreboard(this);
		});
	};

	var Scoreboard = function(element){
		function init(){
			getScores();
		}

		function getScores(){
			$.ajax({
				url: '/scores',
				dataType: 'json',
				success : function(competitors){
					competitors.forEach(displayScore);
				}
			});
		}

		function displayScore(contestant){
			var nameElement = $('<span>')
					.addClass('name')
					.text(contestant.name),
				botElement = $('<div>')
					.addClass('bot')
					.append(nameElement);
			$(element).append(botElement);
		}
		init();
	};
})(jQuery);
