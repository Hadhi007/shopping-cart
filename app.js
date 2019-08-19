//if(process.env.NODE_ENV !=='production'){
//  require('dotenv').config()
//}


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let expresshbs = require('express-handlebars')
let db=require('./dbconfig/db-connect')
let session=require('express-session')
var indexRouter = require('./routes/index');
let flash=require('connect-flash')
let userRouter=require('./routes/user')
var app = express();
let validator= require('express-validator')

// view engine setup
app.engine('.hbs',expresshbs({defaultLayout:'layout',extname:'.hbs'}))
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'mysecret',resave: false,saveUninitialized:false}))
app.use(validator())
app.use(flash())


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user',userRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
db.connect(function (error) {
  if(error){
    console.log('unabale to connect database')
    process.exit(1)
  }else{
    console.log('shopping cart datatbase connected succesfully.....')
  }

})
module.exports = app;
