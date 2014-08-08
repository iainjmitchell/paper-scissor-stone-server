var express = require('express');
var http = require('http');
var path = require('path');
var website = express();
var fakeGame = {
	addCompetitors : function(){}
};

website.set('port', process.env.PORT || 3000);
website.set('views', path.join(__dirname, 'views'));
website.set('view engine', 'ejs');
website.use(express.favicon());
website.use(express.logger('dev'));
website.use(express.json());
website.use(express.urlencoded());
website.use(express.methodOverride());
website.use(website.router);
website.use(require('less-middleware')(path.join(__dirname, 'public')));
website.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == website.get('env')) {
  website.use(express.errorHandler());
}


require('./src/routing')(website, fakeGame);

http.createServer(website).listen(website.get('port'), function(){
  console.log('Express server listening on port ' + website.get('port'));
});
