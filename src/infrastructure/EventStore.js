var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var EventStore = function(io){	
	this.notify = function(eventName, event){
		io.emit(eventName, event);
		this.emit(eventName, event);
	};
};

util.inherits(EventStore, EventEmitter);

module.exports = EventStore;