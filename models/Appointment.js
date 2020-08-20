var mongoose  = require('mongoose');
var mongoose= require('mongoose');
const dbconfig = require('../config/DBConfig');

const connectDb = () => {
  return mongoose.connect(dbconfig.url).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})
};
 
const appointmentSchema = new mongoose.Schema(
  {
    user: { 
         type:String,
         required:true
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
     counselor: { 
         type: String, 
         required: true
     },
    timeSlot:{
        type:String,
        required: true
    },
    bookingDate:{
        type:String,
        required: true
    }  
  },
  { timestamps: true },
);
 
const Appointment = mongoose.model('Appointment', appointmentSchema);
 
module.exports=Appointment