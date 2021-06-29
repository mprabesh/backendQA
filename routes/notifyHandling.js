const express = require("express");
const router = express.Router();
const notificationActivities = require("../controllers/notificationController");

router.get("/get/:name", notificationActivities.getNotification);
router.post("/markseen", notificationActivities.markNotification);
router.get("/getCount/:name", notificationActivities.getNotificationCount);

module.exports = router;
