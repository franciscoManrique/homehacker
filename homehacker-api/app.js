require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();

require('./configs/db.config');

const usersRouter = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function (error, req, res, next) {
  console.error('ERROR:', error.message);
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
