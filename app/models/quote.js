var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var QuoteSchema = new Schema({
	timeStamp: { type: Date, default: Date.now, index: true },
	userId: Number,
	quoteBody: String,
	quotee: String
})

QuoteSchema.virtual('id').get(function(){
		return this._id;
	});

QuoteSchema.set('toJSON', {
   virtuals: true
});

module.exports = mongoose.model('Quote', QuoteSchema);