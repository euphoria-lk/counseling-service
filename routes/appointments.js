
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
    let appointment=null;
    await Appointment.findById(req.params.id,(err,app)=>{
        appointment=app;
    })

    let counselor=null;
    await Counselor.find({
        email:appointment.counselor,
    },(err,con)=>{
        counselor=con;
    });

    let newappointment = {
        ...appointment._doc,
        counsellorObj:counselor,
    }
    console.log(appointment);
    res.status(200).json(newappointment);
})

module.exports = router;

