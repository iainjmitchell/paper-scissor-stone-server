(function(module, io, undefined){
	module.IOEventAdapter = function(events, eventStore){
		var socket = io(document.URL);
		console.log(document.URL);

		function init(){
			var count = 0;
			for(count; count < events.length; count++){
				var eventName = events[count];
				socket.on(eventName, function (data){
			        eventStore.notify(eventName, data);
			    });
			}
		};

		init();
	};
})(window, io);
