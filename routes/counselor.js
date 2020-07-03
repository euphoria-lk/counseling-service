
var express = require('express');
var router = express.Router();
var Counselor=require('../models/Counselor');

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
    const counselor= await Counselor.findOne({
      email:req.body.email
    });
    if(counselor){
      res.status(200).send({
      success: 'true',
      message: "Counselor already exists"
      })
    }else{
      const newCounselor= new Counselor({
          email: req.body.email,
          password:req.body.password,
          name:req.body.name,
          description:req.body.description,
          slmc:req.body.slmc,
          hospital:req.body.hospital,
          speciality:req.body.speciality,
          city:req.body.city,
          image:req.body.image 
      })
    const savedCounselor= await newCounselor.save();
    res.status(201).send({
      success:true,
      message:"new Counselor saved successfully"
    })
  }

  }catch(err){
    res.status(500).send({message:err.message})

  }
  
});


module.exports = router;

