var mongoose  = require('mongoose');
const dbconfig = require('../config/DBConfig');

 
const  messageSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    user:{
        type:String,
        required: true
    },
    text:{
        type:String,
        required: true
    } 
  },
  { timestamps: true },
);
 
const Message = mongoose.model('Message', messageSchema);
 
module.exports=Message