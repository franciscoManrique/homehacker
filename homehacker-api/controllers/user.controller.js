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
            console.log('1 ERROR EXISTS EMAIL');
            throw createError(409, `User with email ${req.body.email} already exists`);
        } else{
            user = new User(req.body);
            user.save()
            .then(user => {
                console.log('USER CREATED', user);
                res.status(201).json(user);
            })
            .catch(error => {
                console.log('2 ERROR',  error);
                next(error);
            });
        }
    })
    .catch(error => {
        console.log('3 ERROR ', error);
        next(error);
    });
};

//LIST ALL USERS
module.exports.listUsers = (req, res, next) =>{
    console.log('USERS LIST');
    
    User.find()
    .then(users => {
        console.log('GET USERS: ', users);
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
        console.log('Error to get 1 user', error);
        next(error);
    });
};

module.exports.edit = (req, res, next) =>{
    criteria = {
        $set: req.body
    };
    User.findByIdAndUpdate(req.params.userId, criteria, { runValidators: true, new: true })
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error =>{
        console.log('Error to get 1 user', error);
        next(error);
    });
};

module.exports.edit = (req, res, next) =>{
    criteria = {
        $set: req.body
    };
    User.findByIdAndUpdate(req.params.userId, criteria, { runValidators: true, new: true })
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error =>{
        console.log('Error to get 1 user', error);
        next(error);
    });
};

//CREATE HOUSE
module.exports.createHouse = (req, res, next) =>{
    House.findOne({name: req.body.name})
    .then(house =>{      
        if (house) {             
            throw createError(409, `home with this name exists`);
        } else{
            console.log('creating house');
            house = new House(req.body);
            req.body.start =  new Date(req.body.start);
            req.body.end =  new Date(req.body.end);
            
            house.owner = req.params.userId; 
            return house.save()
            .then(house =>{                
                res.status(201).json(house);
                console.log(`${req.user.name} CREATED A HOUSE NAMED: ${house.name} - ${house.id}`);
            });
        }
    })
    .catch(error => {
        next(error);
    });
};

//LIST ALL HOUSES
module.exports.listHouses = (req, res, next) =>{
    
    House.find({owner: req.params.userId})
    .then(houses =>{
        console.log('FOUND THIS HOUSES: ', houses);
        res.status(200).json(houses);
    })
    .catch(error => {
        console.log('ERROR FINDING HOMES: ', error);
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
            if(req.params.userId == house.owner._id){ //.equals?
                throw createError(403, `You cannot make a booking in your own house ${req.user.name}`);
            } else{
                const startRequest = moment(new Date(req.body.start));
                const endRequest = moment(new Date(req.body.end));
                const startHouse = moment(house.start);
                const endHouse = moment(house.end);
                
                const accept = moment(startRequest).isSameOrAfter(startHouse);
                const accept2 = moment(endRequest).isSameOrBefore(endHouse);
                
                if (accept && accept2) {
                    
                    booking = new Booking({user:req.params.userId, house: req.params.homeId, start: req.body.start, end: req.body.end});
                    return booking.save()
                    .then(booking => {
                        console.log('BOOKED');
                        
                        res.status(201).json(booking);                    
                    });
                } else{
                    throw createError(409, `This dates are not available for this house ${req.user.name}`);
                } 
            } 
        } else{
            console.log('jokmmk');
            
            throw createError(404, `This house doesnt exist`);
        } 
    }) 
    .catch(error => {                
        next(error);        
    });
};
