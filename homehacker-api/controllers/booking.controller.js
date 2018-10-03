const createError = require('http-errors');
const mongoose = require('mongoose');
const Booking = require('./../models/booking.model');

module.exports.list = (req, res, next)=>{
    Booking.find({user: req.user._id})
    .then(bookings => {
      console.log(bookings);
        res.status(200).json(bookings);
    })
    .catch(error => {
        next(error);
    });
};
