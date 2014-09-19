(function(module, io, undefined){
	module.IOEventAdapter = function(events, eventStore){
		var socket = io(document.URL),
			eventHandlerFactory = new EventHandlerFactory(eventStore);

		function init(){
			var count = 0;
			for(count; count < events.length; count++){
				var eventName = events[count];
				socket.on(eventName, eventHandlerFactory.create(eventName));
			}
		};

		init();
	};

	var EventHandlerFactory = function(eventStore){
		this.create = function(eventName){
			return function(data){
				eventStore.notify(eventName, data);
			};
		};
	};
})(window, io);
