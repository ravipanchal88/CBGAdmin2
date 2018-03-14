var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
//NPM Packages for Authentication
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var passport     = require('passport');
//var flash = require('connect-flash');
var flash = require('express-flash');
var paginate = require('express-paginate');
var app = express();

// Helpers.
var dateFormat = require('dateformat');

app.locals.date = function(date) {
  return(dateFormat(date, 'dd-mmm-yyyy'));
};

//Keep this before all the routes that will use paginate
app.use(paginate.middleware(10,50));

//Routers
var index = require('./routes/index');
var users = require('./routes/user');
var student = require('./routes/student');
var donor = require('./routes/donor');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//console.log('Static Path:'+path.join(__dirname, 'public'));
//app.use(express.static(__dirname + '/public'));

//Middleware for Passport
app.use(session({secret: 'wwerwjflwnfkjhwjkrhewjkrhewjkrhjw12'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Middleware
app.use(function(request, response, next) {
 // console.log("currentUser");
  response.locals.currentUser = request.user;
  next();
});

app.use('/', index);
app.use('/user', users);
app.use('/student',student);
app.use('/donor',donor);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
