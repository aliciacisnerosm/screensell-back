var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('./middleware/cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var productsRouter = require('./routes/products');
var reviewsRouter = require('./routes/reviews');
var adminsRouter = require('./routes/admins');
var ordersRouter = require('./routes/orders');
var awsRouter = require('./routes/aws');
var mailRouter = require('./routes/mail');
var { mongoose } = require('./db/mongoose');

const dotenv = require('dotenv');

var app = express();

dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/product', productsRouter);
app.use('/admin', adminsRouter);
app.use('/review', reviewsRouter);
app.use('/order', ordersRouter);
app.use('/aws', awsRouter);
app.use('/mail', mailRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
