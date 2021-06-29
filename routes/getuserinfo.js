const express = require("express");
const router = express.Router();
const userInfoActivities = require("../controllers/userInfoController");
const viewHandle = require("../controllers/viewController");

router.get("/newRequests", userInfoActivities.getNewRequest);
router.get("/allUser", userInfoActivities.getAllUser);
router.get("/count/:name", userInfoActivities.getPostCount);
router.get("/aboutinfo/:UID", userInfoActivities.getAboutInfo);
router.get("/viewarray/:ID", viewHandle.getViewArray);
router.post("/viewadd", viewHandle.addView);

module.exports = router;
