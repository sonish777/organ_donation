const express = require('express');
const router = express.Router();
const hotcController = require('./../controller/hotcController.js');

router.get('/',hotcController.hotcLogin);
router.get('/profile',hotcController.getHotc);
router.get('/createHospital',hotcController.createHospital);
router.get('/hospitallist', hotcController.viewHospital);
router.get('/transplanthistory', hotcController.transplantHistory);
router.get('/donorlist', hotcController.viewDonor);
router.get('/reciverlist', hotcController.viewReciver);
router.get('/matchlist', hotcController.matchList);
router.get('/matchedlist', hotcController.getmatchList);

router.post('/createhos',hotcController.createhospital);
router.post('/matched', hotcController.matched);
module.exports = router;