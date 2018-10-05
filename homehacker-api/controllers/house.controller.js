const createError = require('http-errors');
const mongoose = require('mongoose');
const House = require('./../models/house.model');
const User = require('./../models/user.model');

module.exports.list = (req, res, next)=>{
    House.find({start:{ $gte: Date.now()}})
    .populate('owner')  
    .then(houses => {  
        res.status(200).json(houses);
    })
    .catch(error => {        
        next(error);
    });
};

module.exports.listByDateRange = (req, res, next)=>{
    const start = new Date(req.query.start);
    const end = new Date(req.query.end);
    
    if(start < new Date()){
        throw createError(403, `You cannot find houses before today ${req.user.email}`);
    }else{
        House.find({$and: [{start:{ $lte: start}},{end:{ $gte: end}}]})
        .populate('owner')
        .then(houses => {        
            res.status(200).json(houses);
        })
        .catch(error => {  
            console.log(error);
            next(error);
        });
    }       
};

module.exports.get = (req, res, next)=>{
    House.findById(req.params.houseId)
    .then(house => res.status(200).json(house))
    .catch(error => next(error));
};
