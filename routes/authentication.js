const express = require("express");
const router = express.Router();
const authenticationActivities = require("../controllers/authenticationController");

router.post("/", authenticationActivities.authenticateUser);
router.post("/changepassword", authenticationActivities.changePassword);
module.exports = router;
