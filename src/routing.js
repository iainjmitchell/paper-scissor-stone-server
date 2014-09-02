var fileSystem = require('fs');

module.exports = function(website, game, eventStore){
	fileSystem.readdirSync('./src/routes').forEach(function(file) {
	  require('./routes/' + file)(website, game, eventStore);
	});
};