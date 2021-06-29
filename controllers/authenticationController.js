const mongoose = require("mongoose");
const dbSchema = require("../dbSchemas/allSchema");
const mongoConnect = require("../controllers/mongoConnect");
const userModel = new mongoose.model("userinfo", dbSchema.userSchema);
const jwt = require("jsonwebtoken");
const secret_key = "thisisthesecretkey";
const rsecret_key = "thisistherefreshkey";

const authenticateUser = (req, res) => {
  const data = req.body.values;
  console.log(data);
  mongoConnect();
  const checkEmail = async () => {
    const credentials = { email: data.email };
    try {
      await userModel.findOne(credentials, (err, result) => {
        if (!err) {
          //Check the validity of the email if is valid check for password and send res.json
          if (result) {
            // const a = false;
            // data.email === "prabeshmagar@gmail.com" ? (a = true) : (a = false);
            const userData = {
              Name: result.firstname + " " + result.lastname,
              UID: result._id,
              sessionValid: true,
              accessToken: generateAccessToken(),
              refreshToken: generateRefreshToken(),
              isAdmin: false,
            };
            result.password === data.password
              ? res.json(userData)
              : res.sendStatus(403);
          } else {
            res.send("Invalid Account");
          }
        } else {
          res.send(err);
        }
      });
    } catch (err) {
      res.send(err);
    }
  };
  checkEmail();
};
function generateAccessToken() {
  return jwt.sign({}, secret_key);
}
function generateRefreshToken() {
  return jwt.sign({}, rsecret_key);
}

const changePassword = async (req, res) => {
  const data = req.body.value;
  mongoConnect();
  const userModel = new mongoose.model("userinfo", dbSchema.userSchema);

  const checkOldPassword = async () => {
    const updateField = async () => {
      try {
        await userModel.updateOne(
          { _id: data.UID },
          { $set: { password: data.newpassword } }
        );
        res.sendStatus(200);
      } catch (err) {
        res.send(err);
      }
    };
    try {
      await userModel.findOne({ _id: data.UID }, (err, result) => {
        if (!err) {
          if (result) {
            result.password === data.oldpassword
              ? updateField()
              : res.sendStatus(403);
          } else {
            res.sendStatus(403);
          }
        } else {
          res.send(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  checkOldPassword();
};
module.exports = { authenticateUser, changePassword };
