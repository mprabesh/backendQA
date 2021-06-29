const express = require("express");
const router = express.Router();
const questionActivities = require("../controllers/questionController");

router.post("/add", questionActivities.question_add);

router.get("/getall", questionActivities.question_getall);

router.get("/getSpecific/:name", questionActivities.question_getSpecific);

router.post("/delete", questionActivities.question_delete);

module.exports = router;
