// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// app.listen(8080, function () {
//   console.log('Example app listening on port 8080!');
// });

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path= require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = require('./routes/index.js')
var api = require('./api/index.js')

//read .env file
require('dotenv').config({
    slient:true
})
//set the view engine
app.set('view engine','jade');
app.set('views', path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//set router
router(app);

//set api

app.use('/api', api);

//set the database

var mongouri = process.env.MONGOLAB_URI  || 'mongodb://localhost:27017/img-search';

mongoose.connect(mongouri,function(err,db){
    if(err) throw err;
    console.log("Now connected to databse" + mongouri);
    
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app ;