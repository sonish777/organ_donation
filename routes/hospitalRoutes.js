const express = require("express");
const router = express.Router();
const hospitalController = require("./../controller/hospitalController.js");
const authController = require("../controller/authController");

router.use(authController.isLoggedIn("Hospital"));

router.get("/", hospitalController.hospitalLogin);
router.post(
  "/login",
  hospitalController.loginHospital,
  hospitalController.organTest
);

router.use(authController.protectRoute("Hospital"));

router.get("/organtest", hospitalController.organTest);
router.get("/recipientregister", hospitalController.registerRecipient);
router.get("/transplant", hospitalController.transplant);
router.get("/donorlist", hospitalController.hospitaldonorlist);
router.get("/recieverlist",hospitalController.hospitalrecieverlist);

router.get("/logout", authController.getLoggedOut("hospital"));

router.post("/submitmedicaldetails" , hospitalController.submitMedicalDetails);

router.post("/registerrecipient", hospitalController.getRegisterRecipient);

module.exports = router;
