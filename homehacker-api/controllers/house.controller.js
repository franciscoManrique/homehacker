const createError = require('http-errors');
const mongoose = require('mongoose');
const House = require('./../models/house.model');
const User = require('./../models/user.model');

//CARGA TODAS LAS CASAS SOLO OFRECIENDO 50 HASTA QUE SE LLEVE A CABO LA BUSQUEDA FILTRADA
module.exports.list = (req, res, next)=>{
    console.log(req.user);
    House.find({$and:[{start:{ $gte: Date.now()}},{owner: {$ne: req.user._id} }]})
    .populate('owner') 
    .limit(50) 
    .then(houses => {  
        res.status(200).json(houses);
    })
    .catch(error => {        
        next(error);
    });
};

module.exports.listByDateRange = (req, res, next)=>{
    
    House.find({$and: [{start:{ $lte: req.query.start}},{end:{ $gte: req.query.end}}]}) // BOOSCAR SOBRE BOOKINGS
    .populate('owner')
    .then(houses => {    
        console.log(houses);
            
        res.status(200).json(houses);
    })
    .catch(error => {  
        console.log(error);
        next(error);
    });
    
};

module.exports.get = (req, res, next)=>{
    House.findById(req.params.houseId)
    .then(house => res.status(200).json(house))
    .catch(error => next(error));
};

module.exports.filteredSearch = (req, res, next)=>{
    // console.log('HEEEYE');
    console.log(req.query);
    
    res.json({ok: 'okay'})
    
    // House.findById(req.params.houseId)
    // .then(house => res.status(200).json(house))
    // .catch(error => next(error));
    
    // const start = new Date(req.query.start);
    // const end = new Date(req.query.end);
    
    // if(start < new Date()){
    //     throw createError(403, `You cannot find houses before today ${req.user.email}`);
    // }else{
    //     House.find({$and: [{start:{ $lte: start}},{end:{ $gte: end}}]}) // BOOSCAR SOBRE BOOKINGS
    //     .populate('owner')
    //     .then(houses => {        
    //         res.status(200).json(houses);
    //     })
    //     .catch(error => {  
    //         console.log(error);
    //         next(error);
    //     });
    // }   
    
    
};
