const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user.controller');
const middlewares = require('./../middlewares/secure.middleware');

//CREATE AND GET USERS
router.post('/', userController.createUser); // CREATE
router.get('/:id', middlewares.isAuthenticated, userController.getUser); //GET USER BY ID
router.get('/', middlewares.isAuthenticated, userController.listUsers);//GET USERS
router.patch('/:userId/edit', middlewares.isAuthenticated, middlewares.isMe, userController.edit);//GET USERS

//GET HOME(S)
router.get('/:userId/homes/:homeId', middlewares.isAuthenticated, userController.getHouse);//GET HOME OF A USER
router.get('/:userId/homes', middlewares.isAuthenticated, userController.listHouses);//GET HOMES OF USER ID

//USER CREATE A HOUSE
router.post('/:userId/homes', middlewares.isAuthenticated, middlewares.isMe, middlewares.datesCheck, userController.createHouse);

//USER MAKE A BOOKING LO HAGO AQUI PORQUE SI HAGO HOMES/:homeid/booking no puedo comprobar el is me del req.params
router.post('/:userId/homes/:homeId/booking', middlewares.isAuthenticated, middlewares.isMe, middlewares.datesCheck, middlewares.reservationsCheck, userController.makeBooking);

//USER CHECK BOOKINGS

// router.delete('/:id', middlewares.isAuthenticated, userController.delete);
// router.get('/:id/homes', userController.listHomes);
// router.get('/:userId/homes', userController.getHomes);
// router.get('/:userId/homes/:homeId', userController.getHome);

module.exports = router;
