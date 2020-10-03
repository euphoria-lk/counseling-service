var Counselor= require('./Counselor');
var Appointment= require('./Appointment');
var Message= require('./Message');
var Chat= require('./ChatRoom');
var User= require('./User');
var mongoose= require('mongoose');
const url = require('../config/DBConfig');



 
const models = { Counselor,Appointment,User,Message,Chat};
 
 module.exports= models;