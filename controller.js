(function(){
	"use strict";
	//  node requires
	const express = require('express')
		, appPort        = 5000
		, app             = express()
		, path            = require('path')
		, Server          = require('./server')
		, bodyParser      = require('body-parser')
		, serveStatic     = require('serve-static')
    , logger          = require('morgan')
		, methodOverride  = require('method-override')
		, errorhandler    = require('errorhandler')
		, publicD         = './public/';

	app
			.set('port', appPort)
			.set('cache', false)
			.use(logger('dev'))
			.use(errorhandler())
			.use(express.static(publicD))
			.use(serveStatic(path.join(__dirname, 'public')))
			.use(bodyParser())
			.use(methodOverride())

	new Server(app);

})();


