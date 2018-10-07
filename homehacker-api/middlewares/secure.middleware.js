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
  if(!req.isAuthenticated()){
    throw createError(403);
  } else if(!req.user._id.equals(req.params.userId)){
    throw createError(401, `YOU ARE TRYING TO ACCESS WITH ANOTHER ID`);
  } else{
    console.log('IS YOU BACK');
    next();
  }
};

module.exports.datesCheck = (req, res, next) =>{   
  
  if (req.query) {
    console.log('received QUERY IN DATES CHECK');
    
    if (new Date(req.query.start) < new Date()) {      
      throw createError(401, `The starting date is before today ${req.user.email}`);
    } else if(new Date(req.query.start) > new Date(req.query.end)){
      throw createError(401, `The starting date is later than the ending date ${req.user.email}`);
    } else{
      next();
    }
  } else{
    console.log('received BODY IN DATES CHECK');
    
    if(!req.body.start || !req.body.end){
      throw createError(401, `Start date or end date is missing ${req.user.email}`);
    } 
    else if(new Date(req.body.start) < new Date()){
      throw createError(401, `the start date is before today ${req.user.email}`);
    } else if(new Date(req.body.start) > new Date(req.body.end)){
      throw createError(401, `The start date is after the end date ${req.user.email}`);
    } else{
      console.log('PASSED DATES VALIDATION BACK');
      next();
    }
  }
};

module.exports.checkBookigsOfAllHousesToDisplayAvailableHouses = (req, res, next) =>{   
  console.log(req.query);
  
  Booking.find()
  .then(bookings => {
    res.json(bookings);
  })
  .catch(error => {
    next(error);
  });
};


module.exports.reservationsOfHouseCheck = (req, res, next) =>{   
  console.log(req.body);
  Booking.find({house: req.params.homeId})
  .then(bookings => {
    if (bookings.length > 0) {
      bookings.map((booking)=> {    
        
        //dentro de un booking y si uno de los dos extremos coincide dentro
        const accept = moment(new Date(req.body.start)).isSameOrAfter(booking.start);
        const accept2 = moment(new Date(req.body.end)).isSameOrBefore(booking.end);
        
        //si booking es mas amplio de otro
        const accept3 = (moment(new Date(req.body.start)).isBefore(booking.start) && moment(new Date(req.body.end)).isAfter(booking.end));
        
        console.log('Validaciones:', accept, accept2, accept3);
        
        if(accept3|| accept2 || accept) {
          throw createError(403, `This dates are already booked ${req.user.email}`);
        } else{
          next();
        }      
      });
    } else{
      next();
    }
    
  })
  .catch(error => {
    next(error);
  });
};