var EventStore = function(io){	
	this.notify = function(eventName, event){
		console.log(eventName);
		console.log(event);
		io.emit(eventName, event);
	};
};

module.exports = EventStore;