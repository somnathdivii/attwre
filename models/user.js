var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id:{
		type:Number,
		required:true,
    	unique:true
	},
	access:{
		type:String,
		required:true,
		default:"worker"
	},
	email: {
		type:String,
		required:true
	},
	username: {
		type:String,
		required:true,
    	unique:true
	},
	password: String,
	passwordConf: String
}),
User = mongoose.model('User', userSchema);

module.exports = User;