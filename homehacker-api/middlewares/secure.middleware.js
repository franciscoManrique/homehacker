const createError = require('http-errors');
const User = require('./../models/user.model');
const Booking = require('./../models/booking.model');
const mongoose = require('mongoose');
const moment = require('moment');

module.exports.isAuthenticated = (req, res, next) =>{
  if(req.isAuthenticated()){      
    console.log('YOU ARE AUTHHENTICATED');
    next();
  } else{
    console.log('YOU ARE NOT AUTHHENTICATED');
    throw createError(403);
  }
};

module.exports.isMe = (req, res, next) =>{
  if(!req.isAuthenticated()){
    throw createError(403);
  } else if(!req.user._id.equals(req.params.userId)){
    throw createError(401, `YOU ARE TRYING TO ACCESS WITH ANOTHER ID ${req.user.name}`);
  } else{
    console.log('IS YOU');
    next();
  }
};

module.exports.datesCheck = (req, res, next) =>{
  if(new Date(req.body.start) < new Date()){
    throw createError(401, `You cannot create a house with a date before today ${req.user.name}`);
  } else if(new Date(req.body.start) > new Date(req.body.end)){
    throw createError(401, `You cannot create a house with a date of start after the end date ${req.user.name}`);
  } else{
    console.log('PASSED DATES VALIDATION');
    next();
  }
};

module.exports.reservationsCheck = (req, res, next) =>{ 
  Booking.find({house: req.params.homeId})
  .then(bookings => {
    bookings.map((booking)=> {
      const accept = moment(new Date(req.body.start)).isSameOrAfter(booking.start);
      const accept2 = moment(new Date(req.body.end)).isSameOrBefore(booking.end);
      
      if(accept || accept2){
        throw createError(403, 'This dates are already booked');
      } else{
        next();
      }      
    });
  })
  .catch(error => {
    next(error);
  });
};