var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var QuoteSchema = new Schema({
	timeStamp: { type: Date, default: Date.now },
	userId: Number,
	quoteBody: String,
	quotee: String
})

module.exports = mongoose.model('Quote', QuoteSchema);