const express = require("express");
const app = express();
const cors = require("cors");
const questionHandling = require("./routes/questionHandling");
const answerHandling = require("./routes/answerHandling");
const userRegisterHandling = require("./routes/userRequestHandling");
const userInfo = require("./routes/getuserinfo");
const authenticate = require("./routes/authentication");
const notification = require("./routes/notifyHandling");

app.use(cors());
app.use(express.json());
app.use("/question", questionHandling);
app.use("/answer", answerHandling);
app.use("/register", userRegisterHandling);
app.use("/get", userInfo);
app.use("/authenticate", authenticate);
app.use("/notification", notification);

app.listen(1234, () => {
  console.log("listening to port 1234");
});
