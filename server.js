/*
 *	API route specifications and handler functions
 */

// Define API listening port
var port = process.env.PORT || 443;

// Required Node modules
var fs 				= require('fs');
var https			= require('https');
var privateKey		= fs.readFileSync('encryption/server.key', 'utf8');
var certificate		= fs.readFileSync('encryption/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

var express 		= require('express');
var app 			= express();

var cors			= require('cors');
var bodyParser 		= require('body-parser');

var httpsServer		= https.createServer(credentials, app);

var io 				= require('socket.io')(httpsServer);

httpsServer.listen(443);

// MONGOOSE MODELS
var QuoteModel		= require('./app/models/quote');

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

// Test index route
router.get('/', function(req, res) {
	res.sendfile('index.html');
});

router.route('/quotes')
	// Get the last 20 quotes (from now)
	.get(function(req, res){

	})
	// Post a quote
	.post(function(req, res){
		// Quote Model:
		// 	timeStamp: 	Date, (defaults to now)
		//	userId: 	Number,
		//	quoteBody: 	String,
		//	quotee: 	String

		var quote = new QuoteModel();
		quote.userId 	= req.userId;
		quote.quoteBody = req.quoteBody;
		quote.quotee 	= req.quotee;

		quote.save(function(err, savedQuote){
			if (err)
				res.send(err);

			res.send("{id:" + savedQuote._id + "}");
		});
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

io.on('connection', function(socket){
	// Upon sending a new quote, notify other users
	// there is a new quote and save it to the database
	socket.on('new_quote', function(data){
		socket.emit('new_quote');
	});
});


//===================================
//	END ROUTES
//===================================
// All routes will be relative to '/'
app.use('/', router);

// // Listen for requests
// app.listen(port);

console.log("API now listening on port: " + port);