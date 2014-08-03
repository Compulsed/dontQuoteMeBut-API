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
var mongoose		= require('mongoose');

var mongoUri = 	process.env.MONGOLAB_URI ||
  				process.env.MONGOHQ_URL ||
  				'mongodb://localhost/dqmb';

mongoose.connect(mongoUri);

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


router.route('*')
	.all(function(req, res, next) {
		Middleware(req, res, next);
	});

router.route('/quotes')
	// Get the last 20 quotes (from now)
	.get(function(req, res){

	})
	// Post a quote
	.post(function(req, res){

	})
	// Update your own quote (admin override)
	.put(function(req, res){

	})
	// Delete your own quote (admin override)
	.delete(function(req,res){

	})

router.route('/quotes/:from_time')
	// Get 20 quotes prior to the given time :from_time
	.get(function(req, res){

	})



//===================================
//	SOCKET.IO ROUTES
//===================================


//===================================
//	END ROUTES
//===================================
// All routes will be relative to '/'
app.use('/', router);

// // Listen for requests
// app.listen(port);

console.log("API now listening on port: " + port);