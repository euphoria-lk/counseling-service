
var express = require('express');
var router = express.Router();
var Counselor=require('../models/Counselor');
var Appointment=require('../models/Appointment');
var User=require('../models/User');
var ObjectId = require('mongodb').ObjectID;

router.get('/user/:email',async function(req,res,next){
   const appointments=await Appointment.find({
       user:req.params.email.toString(),
   });
   res.status(200).json(appointments);
});

router.get('/:id',async function(req,res,next){
    const appointment = await Appointment.findById(req.params.id);
    res.status(200).json(appointment);
})

module.exports = router;

