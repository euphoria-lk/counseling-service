var express = require('express');
var router = express.Router();
var Counselor=require('../models/Counselor');
var Message=require('../models/Message');
var ChatModel=require('../models/ChatRoom');
var User=require('../models/User');
var MessageRoom=require('../models/MessageRoom');
var ObjectId = require('mongodb').ObjectID;
// import {StreamChat} from 'stream-chat';
var StreamChat= require('stream-chat').StreamChat;


// develp in future as own chat module
router.post('/send', function(req, res, next) {
  try{
   
  }catch(err){
    res.status(500).send({message:err.message})

  }
});

router.post('/init',function(req, res, next){
   try{
     var string = req.body.string;
    const client = new StreamChat('r3qdy2xxezkj', 'cn4sm8s56h525y6q5zfbf78d9uaq7yccqf5sycus8a67pcbs62fp62rzrf93xs7f');
    const token = client.createToken(string);   
    res.json(token);
  }catch(err){
    res.status(500).send({message:err.message})

  }
})

router.post('/chatRoom',async function(req, res, next){
  try{

     var objID1 = req.body.CounselorID;
     var objID2 = req.body.ClientID;
     const id= String(objID1).concat(String(objID2));
    const reqRoom= await MessageRoom.findOne({
        ref:id
      });
      if(reqRoom){
         await res.status(201).send({
            success:true,
            id:reqRoom._id,
            message:"room exists"
          })
      }else{
        const room= new MessageRoom({
         
            ref:id,
            })
            const savedAppointment= await room.save();
            await res.status(201).send({
              success:true,
              id:savedAppointment._id,
              message:"room created"
            })


    
      }

      
  }catch(err){
    res.status(500).send({message:err.message})

  }
})

module.exports = router;