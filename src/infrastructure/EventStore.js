var EventStore = function(){	
	this.notify = function(eventName, event){
		console.log(eventName);
		console.log(event);
	};
};