(function(module, undefined){	
	module.EventStore = function(){
		var events = {};

		this.notify = function(eventName, event){
			console.log('event store notified');
			var count = 0,
				callbacks = events[eventName];
			console.log(events);
			console.log(eventName);
			if (!!callbacks){
				console.log('callbacks');
				console.log(callbacks);
				for(count; count < callbacks.length; callbacks++){
					console.log('asdasdad');
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
})(window);