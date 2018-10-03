require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

require('./configs/db.config');
require('./configs/passport.config').setup(passport);//le paso passport al setup
const corsConfig = require('./configs/cors.config');

const usersRouter = require('./routes/users.route');
const housesRouter = require('./routes/houses.route');
const sessionsRouter = require('./routes/sessions.route');
const bookingsRouter = require('./routes/bookings.route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsConfig));

require("./configs/session.config")(app);

app.use(passport.initialize());
app.use(passport.session());

// app.use('/users/:userId/houses/:houseId/bookings/:bookingId', bookingsRouter);//check bookings of one house
app.use('/users', usersRouter); //users and house creatng and make a booking
app.use('/sessions', sessionsRouter);// sessions
app.use('/houses', housesRouter);// house listing
app.use('/bookings', bookingsRouter);// house listing

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  
  const data = {};
  
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);
    for (field of Object.keys(error.errors)) {
      error.errors[field] = error.errors[field].message;
    }
    data.errors = error.errors;
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, 'Resource not found');
  }
  
  data.message = error.message;  
  res.json(data);
});

module.exports = app;
