
var express = require('express');
var router = express.Router();
var Counselor=require('../models/Counselor');
var Appointment=require('../models/Appointment');
var User=require('../models/User');
var ObjectId = require('mongodb').ObjectID;
/* GET Counselors listing. */
router.get('/:pageCount',getCountedCounsellors, function(req, res) {
  res.send(res.getcountedCounsellors);
});
async function getCountedCounsellors(req, res, next) {
  try{
    const counselors= await Counselor.find().limit(parseInt(req.params.pageCount));
    res.status(201).json(counselors);
  }catch(err){
    res.status(500).send({
      success: false,
      message:err.message

    });
  }
  next();

}
router.get('/user/:email',async function(req,res,next){
try{
  const user = await User.findOne({ email: req.params.email})
  if(user){
    return res.status(200).json(user);
  }else{
    return res.status(201).send({
      message:'no such a user'
    })
  }
}catch(err){
  console.log(err);
  res.status(500).send({
    message:err
  })
}

})

router.get('/profile/:counselor',async function(req,res,next){
  try{
    const counselorEmail= req.params.counselor.toString();
  
    const appointments =await Appointment.find({
      counselor:counselorEmail
    });
  
    // console.log(userById.firstname);
  if(appointments.length<1){
    res.status(200).json({
      message:"no upcoming appointments"
    })
  }else{
    res.status(201).json(appointments);
  }

  }catch(err){
    console.log(err)
    res.status(500).send({
      message:err
    })
  }
})

router.post('/appointments', async function(req,res,next){
  try{
      // console.log("first Name"+req.body.firstname);
      const reqCounselor= await Counselor.findOne({
        name:req.body.counselor
      });

      const reqUser= await User.findOne({
        firstname:req.body.firstname,
        lastname:req.body.lastname
      });
      console.log("this is req user"+reqCounselor);
      console.log("this is counselor"+reqCounselor);
      if(!reqUser){
        return await res.status(200).json({
          message:"user not found"
        })
      }else if(!reqCounselor){
         return await res.status(200).json({
          message:"counselor not found"
        })
      }else{
         const newAppointment= new Appointment({
         
          user:reqUser.email,
          description:req.body.description,
          counselor:reqCounselor.email,
          title:req.body.title,
          timeSlot:req.body.timeSlot,
          bookingDate:req.body.bookingDate
          })
          console.log('New Appointment',newAppointment);
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

// router.get('/findByEmail/:email', async function(req,res,next))

// url http://localhost:5000/api/v1/counselling-service/counsellor/getAvailableTimes/email&year-month-day
router.get('/getAvailableTimes/:counselor&:day',async function(req,res,next){
  try{
    console.log("counselor"+req.params.counselor);
    console.log("day"+req.params.day);

    const counselorEmail=req.params.counselor.toString();
    const reqDay=req.params.day.toString();

    const appointments =await Appointment.find({
      counselor:counselorEmail,
      bookingDate:reqDay
    });

    var response=["6-7","7-8","8-9","9-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"];
    appointments.forEach(function(data){
     
      const time= data.timeSlot.toString();
    
      response.filter(function(val, index, arr){ 
        
      if(val === time  ){
        response[index]="booked";
      }
      
      })
 
    })

    res.status(201).json(response);
  

  }catch(err){
    console.log(err)
    res.status(500).send({
      message:err
    })
  }

})

module.exports = router;

