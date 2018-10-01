const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user.controller');
const middlewares = require('./../middlewares/secure.middleware');

router.get('/:userId/homes', middlewares.isAuthenticated, userController.listHouses);//GET HOMES OF USER ID
router.get('/:userId/homes/:homeId', middlewares.isAuthenticated, userController.getHouse);//GET HOME OF A USER

router.get('/', middlewares.isAuthenticated, userController.listUsers);//GET USERS
router.post('/', userController.createUser); // CREATE
router.get('/:id', middlewares.isAuthenticated, userController.getUser); //GET USER BY ID
// router.delete('/:id', middlewares.isAuthenticated, userController.delete);

// router.get('/:id/homes', userController.listHomes);
// router.get('/:userId/homes', userController.getHomes);
// router.get('/:userId/homes/:homeId', userController.getHome);

router.post('/:userId/homes', middlewares.isAuthenticated, middlewares.isMe, userController.createHouse);

module.exports = router;
