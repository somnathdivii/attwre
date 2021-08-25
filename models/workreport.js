var mongoose = require('mongoose');
var Schema = mongoose.Schema;

workreportSchema = new Schema( {
	
    xpname:{
		type:String,
		required:true
	},

    report:{
		type:String,
		required:true
	},
	timespent:{
		type:String,
		required:true
	},
	created_by: {
		type:String,
		required:true
	},
	create_date: {
		type:Date,
		required:true,
	},
    update_date: {
		type:Date,
		// required:true,
	},


	// unique_id: Number,
	// xpname: String,
    // report: String,
    // timespent : String,
	// created_by: String,
	// create_date: Date,
	// update_date: Date
}),
Workreport = mongoose.model('Workreport', workreportSchema);

module.exports = Workreport;