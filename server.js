module.exports = function(app){
  "use strict";
	var http = require('http');
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
};


module.exports = function (app) {
	"use strict";
	var http = require ('http');
	http.createServer (app).listen (app.get ('port'),function () {
		console.log ('Express server listening on port ' + app.get ('port'));
	}).on ('error', function (e) {
		console.log ("got error: " + e.message);
	});
};
