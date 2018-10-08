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
    throw createError(401, `You are trying to avccess with another id`);
  } else{
    console.log(`passed is me`);
    next();
  }
};

module.exports.datesCheck = (req, res, next) =>{   
  
  if (req.query.start && req.query.end) {
    if (new Date(req.query.start) < new Date()) {      
      throw createError(401, `The starting date is before today ${req.user.email}`);
    } else if(new Date(req.query.start) > new Date(req.query.end)){
      throw createError(401, `The starting date is later than the ending date ${req.user.email}`);
    } else{
      console.log('passed dates validation(no wrong dates) having query');
      next();
    }
  } else if(req.body.start && req.body.end){
    if (new Date(req.body.start) < new Date()) {
      throw createError(401, `the start date is before today ${req.user.email}`);
    } else if(new Date(req.body.start) > new Date(req.body.end)){
      throw createError(401, `The start date is after the end date ${req.user.email}`);
    }  else{
      console.log('passed dates validation(no wrong dates) having query');
      next();
    }
  }
};   


module.exports.checkBookigsOfAllHousesToDisplayAvailableHouses = (req, res, next) =>{
  // const accept = moment(new Date(req.query.start)).isSameOrAfter(booking.start);
  // const accept2 = moment(new Date(req.query.end)).isSameOrBefore(booking.end);
  
  //si booking es mas amplio de otro
  // const accept3 = (moment(new Date(req.query.start)).isBefore(booking.start) && moment(new Date(req.query.end)).isAfter(booking.end));
  // owner: {$ne: req.user._id} // PONERLE QUE NO SALGA YO
  
  Booking.find()
  .then(bookings => {
    bookings.map((booking) => {
      
      // console.log('Validaciones:', accept, accept2, accept3);
      
    });
    
    
  })
  .catch(error => {
    next(error);
  });
};


// module.exports.reservationsOfHouseCheck = (req, res, next) =>{    
//   Booking.find({house: req.params.homeId})
//   .then(bookings => {    
//     if (bookings.length > 0) {

//       bookings.map((booking)=> {  
//         console.log('111234567890');


//         //dentro de un booking y si uno de los dos extremos coincide dentro
//         const accept = moment(new Date(req.body.start)).isSameOrAfter(booking.start);
//         const accept2 = moment(new Date(req.body.end)).isSameOrBefore(booking.end);
//         const accept3 = (moment(new Date(req.body.start)).isBefore(booking.start) && moment(new Date(req.body.end)).isAfter(booking.end));

//         if(accept3 || (accept2 && accept)) {
//           console.log('This dates are already booked');
//           throw createError(403, `This dates are already booked ${req.user.email}`);
//         } else{          
//           console.log('passed check reservations of this house - you booking doesnt conflict with others');
//           next();
//         }
//       });
//     } else{
//       console.log('passed check reservations of this house - no bookings yet in this house');
//       next();
//     }
//   })
//   .catch(error => {       
//     next(error);
//   });
// };

module.exports.reservationsOfHouseCheck = (req, res, next) =>{    
  Booking.find({house: req.params.homeId})
  .then(bookings => {    
    if (bookings.length > 0) {
      let inConflict = false;

      for (let i = 0; i < bookings.length; i++) {

        const collision1 = moment(bookings[i].start).isSameOrBefore(new Date(req.body.start)) && moment(new Date(req.body.start)).isSameOrBefore(bookings[i].end);
        const collision2 = moment(bookings[i].start).isSameOrBefore(new Date(req.body.end)) && moment(new Date(req.body.end)).isSameOrBefore(bookings[i].end);
        const collision3 = moment(new Date(req.body.start)).isSameOrBefore(bookings[i].start) && moment(new Date(req.body.end)).isSameOrAfter(bookings[i].end);
                
        if (collision1 || collision2 || collision3) {
          inConflict = true;
          break;
        }
      }
      
      if (inConflict) {
        inConflict = false;
        throw createError(403, `you booking is in conflict with other booking`);
      } else{
        console.log('you booking is not in conflict with other bookings');
        next();
      }
      
    } else{
      console.log('passed check reservations of this house - no bookings yet in this house');
      next();
    }
  })
  .catch(error => {       
    next(error);
  });
};