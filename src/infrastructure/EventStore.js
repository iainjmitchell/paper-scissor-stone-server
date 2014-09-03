var EventStore = function(io){	
	this.notify = function(eventName, event){
		io.emit(eventName, event);
	};
};

module.exports = EventStore;