const createError = require('http-errors');
const mongoose = require('mongoose');
const House = require('./../models/house.model');
const Booking = require('./../models/booking.model');
const User = require('./../models/user.model');

//CARGA TODAS LAS CASAS SOLO OFRECIENDO 50 HASTA QUE SE LLEVE A CABO LA BUSQUEDA FILTRADA
module.exports.list = (req, res, next)=>{  
    console.log('LIST ALL HOUSES');
    House.find({$and:[{start:{ $gte: Date.now()}},{owner: {$ne: req.user._id}}]})
    .populate('owner') 
    .populate({ path: 'bookings', populate: { path: 'user' } }) 
    .limit(50) 
    .then(houses => {  
        res.status(200).json(houses);
    })
    .catch(error => {        
        next(error);
    });
};

//BY DATES RANGE
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

//GET ONE
module.exports.get = (req, res, next)=>{
    House.findById(req.params.houseId)
    .populate('owner')
    .populate('bookings')
    .then(house => {
        console.log(house.owner.email);
        
        res.status(200).json(house);
    })
    .catch(error => next(error));
};

//BY FILTER
module.exports.filteredSearch = (req, res, next)=>{
    console.log(111, req.query);
    
    const people = Number(req.query.people);
    
    Booking.find({
        $or:[ 
            {$and:[{start:{$lte:req.query.start}},{end:{$gte:req.query.start}}]} ,
            {$and:[{start:{$lte:req.query.end}},{end:{$gte:req.query.end}}]},
            {$and:[{start:{$gte:req.query.start}},{end:{$lte:req.query.end}}]}]}
        )
        .then(bookings => {  
            if (bookings.length > 0) {  
                console.log('bookings in this dates - excluding the ones booked and show the rest');
                
                const houseIdsOfHousesNotToShow = [];
                
                for (let i = 0; i < bookings.length; i++) {
                    let id = bookings[i].house;
                    houseIdsOfHousesNotToShow.push(id);
                }
                
                return House.find( {$and:[ {owner: {$ne: req.user._id}}, {'_id': { $nin: houseIdsOfHousesNotToShow} }, {people: { $gte: people } }, {start:{$lte:req.query.start}}, {end:{$gte:req.query.end}}]})
                .populate('owner')
                .then(housesToShow => {
                    console.log(housesToShow);
                    
                    res.json(housesToShow);
                });
                
            } else{
                console.log('no bookings in this dates - search all houses');
                return House.find({$and:[{owner: {$ne: req.user._id}}, {people: { $gte: people } }, {start:{$lte:req.query.start}}, {end:{$gte:req.query.end}}]})
                .populate('owner')
                .then(houses => {
                    console.log(houses);
                    res.json(houses);
                });
            }
        })
        .catch(error => { 
            next(error);
        });
        
    };
    
    