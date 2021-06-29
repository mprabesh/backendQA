const express = require("express");
const router = express.Router();
const answerActivities = require("../controllers/answerController");
const notificationActivities = require("../controllers/notificationController");

router.post(
  "/add",
  notificationActivities.addNotification,
  answerActivities.answer_add
);

router.get("/getSpecific/:QID", answerActivities.answer_specific);

router.post("/delete", answerActivities.answer_remove);

module.exports = router;
