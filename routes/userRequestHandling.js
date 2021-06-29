const express = require("express");
const { route } = require("./questionHandling");
const router = express.Router();
const registerActivities = require("../controllers/userRegisterController");

router.post("/newRequest", registerActivities.newRegister);
router.post("/acceptRequest", registerActivities.acceptUser);
router.post("/rmvRequest", registerActivities.removeNewRegister);
router.post("/updateAbout", registerActivities.addAboutInfo);
router.post("/removeUser", registerActivities.removeUser);
module.exports = router;
