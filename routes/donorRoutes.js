const express = require("express");
const router = express.Router();
const donorController = require("./../controller/donorController.js");
const authController = require("./../controller/authController.js");

router.use(authController.isLoggedIn("Donor"));

router.get("/", donorController.getSignIn);
router.get("/register", donorController.getSignUp);

router.use(authController.protectRoute("Donor"));

router.get("/donateorgan", donorController.donateOrgan);
router.get("/profile", donorController.getProfile);
router.get("/checkup", donorController.getCheckup);

router.post("/submitorgan", donorController.submitOrgan);
router.post("/submithospital", donorController.getAppointment);

router.get("/logout", authController.getLoggedOut("donor"));

module.exports = router;
