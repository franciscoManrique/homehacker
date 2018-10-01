const createError = require('http-errors');
const mongoose = require('mongoose');
const House = require('./../models/house.model');
const User = require('./../models/user.model');

module.exports.list = (req, res, next)=>{
    House.find()
    .populate('owner')
    .then(houses => res.status(200).json(houses))
    .catch(error => next(error));
};

module.exports.get = (req, res, next)=>{
    House.findById(req.params.houseId)
    .then(house => res.status(200).json(house))
    .catch(error => next(error));
};
