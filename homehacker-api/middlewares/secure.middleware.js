const createError = require('http-errors');
User = require('./../models/user.model');
mongoose = require('mongoose');

module.exports.isAuthenticated = (req, res, next) =>{
  if(req.isAuthenticated()){      
    console.log('YOU ARE AUTHHENTICATED');
    next();
  } else{
    console.log('YOU ARE NOT AUTHHENTICATED');
    throw createError(403);
  }
};

module.exports.isMe = (req, res, next) =>{
  if(!req.isAuthenticated()){
    throw createError(403);
  } else if(!req.user._id.equals(req.params.userId)){
    throw createError(401, `YOU ARE TRYING TO CREATE A HOME WITH ANOTHER ID ${req.user.name}`);
  } else{
    console.log('IS YOU');
    next();
  }
};

