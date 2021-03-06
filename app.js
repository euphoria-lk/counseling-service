
var models= require('./models');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require ('mongoose');
var indexRouter = require('./routes/index');
var counselorRouter = require('./routes/counselor');
var chatRouter = require('./routes/chat');
var appointmentRouter = require('./routes/appointments');
const url = require('./config/DBConfig');

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect(url||'mongodb://localhost:27017/euphoria',{useNewUrlParser:true,useUnifiedTopology: true})
mongoose.set('useCreateIndex', true)
const db= mongoose.connection

db.on('error',(error)=>console.error(error));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', indexRouter);
app.use('/api/v1/counselling-service/counsellor/', counselorRouter);
app.use('/api/v1/counselling-service/chat/', chatRouter);
app.use('/api/v1/counselling-service/appointments/', appointmentRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  req.context={
   models,
  }
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
