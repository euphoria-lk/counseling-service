var mongoose  = require('mongoose');
var Schema= mongoose.Schema;
const dbconfig = require('../config/DBConfig');

 
const MessageRoom = new mongoose.Schema(
  {
    ref: {
      type: String,
      unique: true,
      required: true,
    }
  },
  { timestamps: true },
);
 
const Chat = mongoose.model('MessageRoom', MessageRoom);
 
module.exports=Chat