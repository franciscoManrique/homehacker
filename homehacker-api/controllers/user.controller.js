const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('./../models/user.model');
const House = require('./../models/house.model');
const Booking = require('./../models/booking.model');
const moment = require('moment');

//CREATE USER
module.exports.createUser = (req, res, next)=>{
    User.findOne({email:req.body.email})
    .then(user=>{
        if (user) {
            throw createError(409, `User with email ${req.body.email} already exists`);
        } else{
            user = new User(req.body);
            user.save()
            .then(user => {
                res.status(201).json(user);
            })
            .catch(error => {
                next(error);
            });
        }
    })
    .catch(error => {
        next(error);
    });
};

//LIST ALL USERS
module.exports.listUsers = (req, res, next) =>{
    
    User.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        next(error);
    });
};

//GET ONE USER
module.exports.getUser = (req, res, next) =>{
    User.findById(req.params.id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error =>{
        next(error);
    });
};

//edit user
module.exports.edit = (req, res, next) =>{
    criteria = {
        $set: req.body
    };
    User.findByIdAndUpdate(req.params.userId, criteria, { runValidators: true, new: true })
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error =>{
        next(error);
    });
};


//CREATE HOUSE CHEQUEAR ESTO CON CARLOS ===>>> 
module.exports.createHouse = (req, res, next) =>{  
    let stringToArrayCoords = req.body.location.split(',');
    console.log(req.body);
    
    const house = new House(req.body);
    house.location.coordinates = stringToArrayCoords;
    house.owner = req.params.userId;
    console.log(house);
    
    if (req.files) {            
        house.photos = [];
        for (const file of req.files) {
            house.photos.push(`${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
        }
    }
    
    
    house.save()
    .then(house => {
        console.log(house);
        
        res.status(201).json(house);
    })
    .catch(error => {
        next(error);
    });
};

//LIST ALL HOUSES OF ONE USER WITH BOOKINGS
module.exports.listHousesOfUser = (req, res, next) =>{  
    // Booking.find({house:})
    console.log('LIST HOUSES OF A USER');
    
    House.find({owner: req.params.userId})
    .populate('owner')
    .populate({ path: 'bookings', populate: { path: 'user' } })
    .then(houses =>{
        
        // const housesOFUser = [];
        // for (let i = 0; i < houses.length; i++) {
        //     housesOFUser.push(houses[i]._id);
        // }
        
        // return Booking.find({house: {$in:housesOFUser}})
        // .populate('user')
        // .populate('house')
        // .then(bookings => {
        //     if (bookings) {
        //         console.log('hay bookings sobre mis casas');                
        //         res.json(houses, bookings);
        //     } else{      
        //         console.log('no bookings sobre mis casas');
        //         res.json(houses);
        //     }
        // });
        
        res.status(200).json(houses);
        
    })
    
    .catch(error => {
        next(error);
    });
    
};


//GET HOUSE OF A USER
module.exports.getHouse = (req, res, next) =>{  
    House.findOne({ $and: [ { owner: req.params.userId}, { _id: req.params.homeId} ] })
    .then(house =>{        
        if (house) {            
            res.status(200).json(house);
        } else{                        
            throw createError(404, `house not found`);
        }
    })
    .catch(error => {
        next(error);
    });
};

module.exports.makeBooking = (req, res, next) =>{        
    
    House.findById(req.params.homeId)
    .populate('owner')
    .then(house => {
        
        if (house) {
            if(req.params.userId == house.owner._id){
                throw createError(403, `You cannot make a booking in your own house ${req.user.email}`);
            } else{
                console.log('passed that this is not your own house', req.params.userId);
                
                const startRequest = moment(new Date(req.body.start));
                const endRequest = moment(new Date(req.body.end));
                const startHouse = moment(house.start);
                const endHouse = moment(house.end);
                
                const accept = moment(startRequest).isSameOrAfter(startHouse);
                const accept2 = moment(endRequest).isSameOrBefore(endHouse);
                
                if (accept && accept2) {
                    console.log('passed validation booking dates are in range of house rent');
                    booking = new Booking({user:req.params.userId, house: req.params.homeId, start: req.body.start, end: req.body.end});
                    return booking.save()
                    .then(booking => {
                        console.log('booked house');
                        res.status(201).json(booking);                    
                    });
                } else{
                    console.log('This dates are not available for this house');
                    throw createError(409, `This dates are not available for this house ${req.user.email}`);
                }  
            }
        } else{
            throw createError(403, `the house doesnt exist ${req.user.email}`);
        }
    })
    .catch(error => {
        next(error);
    });
};
