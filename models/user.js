const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true
	},
	mnumber: {
		type: Number,
		required: true
	},
	email:{
		type:String,
		required:true
	},
	credits: {
		type: String,
		min: 0,
		required: true
	}
});
const User = mongoose.model('User', userSchema);

module.exports=User;
