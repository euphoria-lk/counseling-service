var mongoose  = require('mongoose');
var Schema= mongoose.Schema;
const dbconfig = require('../config/DBConfig');

 
const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    messages:[{
        type:Schema.Types.ObjectId,
        ref:"Message"
    }]
  },
  { timestamps: true },
);
 
const Chat = mongoose.model('Chat', chatSchema);
 
module.exports=Chat