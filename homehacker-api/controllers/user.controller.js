const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('./../models/user.model');
const House = require('./../models/house.model');

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

module.exports.createHouse = (req, res, next) =>{
    
    //PUEDO METERLO ESTO O HACER PROMISE.ALL???
    
    // async function waitForPromise() {
    //     let result = await Promise.resolve('this is a sample promise');
    // }
    
    House.findOne({name: req.body.name})
    .then(house =>{      
        if (house) {             
            throw createError(409, `home with this name exists`);
        } else{  
            console.log('creating house');
            // req.body.start =  new Date(req.body.start);
            // req.body.end =  new Date(req.body.end);
            house = new House(req.body); 
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
