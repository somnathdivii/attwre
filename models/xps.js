var mongoose = require('mongoose');
var Schema = mongoose.Schema;

xpsSchema = new Schema( {
	
	unique_id: Number,
	xpname: String,
	created_by: String,
	create_date: Date,
	update_date: Date
}),
Xps = mongoose.model('Xps', xpsSchema);

module.exports = Xps;