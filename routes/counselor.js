
var express = require('express');
var router = express.Router();
var Counselor=require('../models/Counselor');
var Appointment=require('../models/Appointment');
var User=require('../models/User');

/* GET Counselors listing. */
router.get('/:pageCount',getCountedCounsellors, function(req, res) {
  res.send(res.getcountedCounsellors);
});
async function getCountedCounsellors(req, res, next) {
  try{
    const counselors= await Counselor.find().limit(parseInt(req.params.pageCount));
    // res.Counselors =counselors;
    res.status(200).json(counselors);
  }catch(err){
    res.status(500).send({
      success: false,
      message:err.message

    });
  }
  next();

}

router.post('/appointments', async function(req,res,next){
  try{
      console.log("first Name"+req.body.firstname);
      const reqCounselor= await Counselor.findOne({
        name:req.body.counselor
      });

      const reqUser= await User.findOne({
        firstname:req.body.firstname,
        lastname:req.body.lastname
      });
      console.log("this is req user"+reqCounselor);
      if(!reqUser){
        return await res.status(500).json({
          message:"user not found"
        })
      }else if(!reqCounselor){
         return await res.status(500).json({
          message:"counselor not found"
        })
      }else{
         const newAppointment= new Appointment({
         
          user:reqUser,
          description:req.body.description,
          counselor:reqCounselor,
          title:req.body.title,
          startTime:req.body.startTime,
          endTime:req.body.endTime
          })
          const savedAppointment= await newAppointment.save();
          await res.status(201).send({
            success:true,
            message:"new Appointment saved successfully"
          })
  
      }
 
  }catch(err){
    res.status(500).send({message:err.message})

  }
  
});


module.exports = router;

