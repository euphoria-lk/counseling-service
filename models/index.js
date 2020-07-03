var Counselor= require('./Counselor');
var Appointment= require('./Appointment');
var User= require('./User');
var mongoose= require('mongoose');
const url = require('../config/DBConfig');



 
const models = { Counselor,Appointment,User};
 
 module.exports= models;