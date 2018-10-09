const express = require('express');
const router = express.Router();
const uploader = require('./../configs/multer.config');
const userController = require('./../controllers/user.controller');
const middlewares = require('./../middlewares/secure.middleware');

//CREATE AND GET USERS
router.post('/', userController.createUser); // CREATE
router.get('/:id', middlewares.isAuthenticated, userController.getUser); //GET USER BY ID
router.get('/', middlewares.isAuthenticated, userController.listUsers);//GET USERS
router.patch('/:userId/edit', middlewares.isAuthenticated, middlewares.isMe, userController.edit);//GET USERS

// //GET HOME(S)
router.get('/:userId/houses/:homeId', middlewares.isAuthenticated, userController.getHouse);//GET HOME OF A USER
router.get('/:userId/houses', middlewares.isAuthenticated, userController.listHouses);//GET houses OF USER ID


//USER CREATE A HOUSE
router.post('/:userId/houses', middlewares.isAuthenticated, middlewares.isMe, uploader.array('photos'), middlewares.datesCheck, userController.createHouse);


//CREATE A BOOKING
router.post('/:userId/houses/:homeId/booking', middlewares.isAuthenticated, middlewares.isMe, middlewares.datesCheck, middlewares.reservationsOfHouseCheck, userController.makeBooking);

module.exports = router;
