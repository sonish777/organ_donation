const express = require('express');
const router = express.Router();
const viewController = require('./../controller/viewController.js');
const donorController = require('./../controller/donorController');

router.get('/', viewController.getHome);
router.post('/signedup',viewController.SignUp);
router.post('/signedin', viewController.SignIn, donorController.getProfile);


module.exports = router;

