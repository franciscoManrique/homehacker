const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('./../models/user.model');
const House = require('./../models/house.model');
const Booking = require('./../models/booking.model');
const moment = require('moment');

//CREATE USER
module.exports.createUser = (req, res, next)=>{
    console.log(1);
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
    console.log(2);
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
    console.log(3);
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
    console.log(4);
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
    console.log(req.body);
    console.log(req.files);
    
    console.log(5);
    console.log('AQUIIIIIII');
    
    console.log('1111');
    
    
    //TERMPORAL=>
    if(new Date(req.body.start) < new Date()){
        console.log('2222');
        
        throw createError(401, `You cannot create a house with a date before today ${req.user.email}`);
    } else if(new Date(req.body.start) > new Date(req.body.end)){
        console.log('3333');
        
        throw createError(401, `You cannot create a house with a date of start after the end date ${req.user.email}`);
    } else{
        console.log('4444');
        
        
        //ONLY THIS=>
        const house = new House(req.body);
        house.owner = req.params.userId;
        
        if (req.files) {
            console.log('555');
            
            house.photos = [];
            for (const file of req.files) {
                console.log(`${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
                house.photos.push(`${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
            }
            
        }
        
        house.save()
            .then(house => {
                console.log('666');
                console.log(house);
                
                res.status(201).json(house);
            })
            .catch(error => {
                console.log('777');
                
                console.log(error);
                
                next(error);
            });
    }
};

//LIST ALL HOUSES
module.exports.listHouses = (req, res, next) =>{
    console.log(6);
    
    House.find({owner: req.params.userId})
    .then(houses =>{
        res.status(200).json(houses);
    })
    .catch(error => {
        next(error);
    });
};

//GET HOUSE OF A USER
module.exports.getHouse = (req, res, next) =>{  
    console.log(7);   
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
