var fileSystem = require('fs');

module.exports = function(website){
	fileSystem.readdirSync('./src/routes').forEach(function(file) {
	  require('./routes/' + file)(website);
	});
};