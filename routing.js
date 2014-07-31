var fileSystem = require('fs');

module.exports = function(website){
	fileSystem.readdirSync('./routes').forEach(function(file) {
	  require('./routes/' + file)(website);
	});
};