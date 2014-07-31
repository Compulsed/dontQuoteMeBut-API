/*
 *	API route specifications and handler functions
 */

// Define API listening port
var port = process.env.PORT || 8080;

// Required Node modules
var express 		= require('express');
var app 			= express();
var http			= require('http').Server(app);
var server 			= app.listen(port);
var cors			= require('cors');
var bodyParser 		= require('body-parser');

// Import request functionality
var Middleware 	= require('./app/middleware');

// Body parser is used to process data from a POST request
app.use(bodyParser());

// Set CORS Headers (changing this will break socket.io functionality)
var corsOptions = {
	origin: true,
	credentials: true
}

app.use(cors(corsOptions));


//===================================
//	ROUTES
//===================================
var router = express.Router();

// Middleware for all requests
router.use(function(req, res, next){
	res.setHeader("Access-Control-Allow-Credentials", "true");
	console.log("Got request");
	next();
});


// ---- /chatrooms ----
router.route('*')
	.all(function(req, res, next) {
		Middleware(req, res, next);
	});


//===================================
//	END ROUTES
//===================================
// All routes will be prefixed with '/api'
app.use('/', router);

// // Listen for requests
// app.listen(port);

console.log("API now listening on port: " + port);