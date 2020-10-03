var express = require('express');
var router = express.Router();
var Counselor=require('../models/Counselor');
var Message=require('../models/Message');
var ChatModel=require('../models/ChatRoom');
var User=require('../models/User');
var ObjectId = require('mongodb').ObjectID;


// develp in future as own chat module
router.post('/send', function(req, res, next) {
  try{
    
  }catch(err){
    res.status(500).send({message:err.message})

  }
});

module.exports = router;