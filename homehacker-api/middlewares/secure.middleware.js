const createError = require('http-errors');
const User = require('./../models/user.model');
const Booking = require('./../models/booking.model');
const mongoose = require('mongoose');
const moment = require('moment');

module.exports.isAuthenticated = (req, res, next) =>{
  if(req.isAuthenticated()){      
    console.log('YOU ARE AUTHENTICATED BACK');
    next();
  } else{    
    console.log('YOU ARE NOT AUTHENTICATED BACK');
    throw createError(403);
  }
};

module.exports.isMe = (req, res, next) =>{
  console.log(1, req.body);
  
  if(!req.isAuthenticated()){
    throw createError(403);
  } else if(!req.user._id.equals(req.params.userId)){
    throw createError(401, `YOU ARE TRYING TO ACCESS WITH ANOTHER ID`);
  } else{
    console.log('IS YOU BACK');
    next();
  }
};

// module.exports.datesCheck = (req, res, next) =>{  
  // if(new Date(req.body.start) < new Date()){
  //   throw createError(401, `You cannot create a house with a date before today ${req.user.email}`);
  // } else if(new Date(req.body.start) > new Date(req.body.end)){
  //   throw createError(401, `You cannot create a house with a date of start after the end date ${req.user.email}`);
  // } else{
  //   console.log('PASSED DATES VALIDATION BACK');
  //   next();
  // }
// };

// module.exports.reservationsCheck = (req, res, next) =>{   
//   Booking.find({house: req.params.homeId})
//   .then(bookings => {
//     if (bookings.length > 0) {
//       bookings.map((booking)=> {        
//         const accept = moment(new Date(req.body.start)).isSameOrAfter(booking.start);
//         const accept2 = moment(new Date(req.body.end)).isSameOrBefore(booking.end);

//         if(accept || accept2){
//           throw createError(403, `This dates are already booked ${req.user.email}`);
//         } else{
//           next();
//         }      
//       });    
//     } else{
//       next();
//     }

//   })
//   .catch(error => {
//     next(error);
//   });
// };