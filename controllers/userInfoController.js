const mongoose = require("mongoose");
const dbSchema = require("../dbSchemas/allSchema");
const mongoConnect = require("../controllers/mongoConnect");

//get all the newRequest
const getNewRequest = async (req, res) => {
  mongoConnect();
  const newRequestModel = new mongoose.model(
    "newRequestinfo",
    dbSchema.newRequestSchema
  );
  const getAll = async () => {
    try {
      var result1 = await newRequestModel.find();
      return result1;
    } catch (err) {
      console.log(err);
    }
  };
  const b2 = await getAll()
    .then((a) => {
      return a;
    })
    .catch((err) => {
      console.log(err);
    });
  res.send(b2);
};
const getAllUser = async (req, res) => {
  mongoConnect();
  const userInfoModel = new mongoose.model("userinfo", dbSchema.userSchema);

  const getAll = async () => {
    try {
      var result1 = await userInfoModel.find();
      return result1;
    } catch (err) {
      console.log(err);
    }
  };
  const b2 = await getAll()
    .then((a) => {
      return a;
    })
    .catch((err) => {
      console.log(err);
    });
  res.send(b2);
};
//this API gets the count of question and answer for different profile
const getPostCount = async (req, res) => {
  const value = req.params.name;
  mongoConnect();
  const answerModel = new mongoose.model("answerinfo", dbSchema.answerSchema);
  const questionModel = new mongoose.model("postinfo", dbSchema.postSchema);
  const countSpecific = async () => {
    const credentials = { name: value };
    try {
      const postCount = await questionModel.countDocuments(credentials);
      const answerCount = await answerModel.countDocuments(credentials);
      return { aValue: answerCount, pValue: postCount };
    } catch (err) {
      res.send(err);
    }
  };
  const b2 = await countSpecific().then((a) => {
    return a;
  });
  res.send(b2);
};
//API to get about info from userprofile

const getAboutInfo = async (req, res) => {
  const value = req.params.UID;
  mongoConnect();
  const userModel = new mongoose.model("userinfo", dbSchema.userSchema);
  const getAboutInfo = async () => {
    const credentials = { _id: value };
    try {
      const aboutValue = await userModel.findOne(credentials);
      return { about: aboutValue.about };
    } catch (err) {
      res.send(err);
    }
  };
  const b2 = await getAboutInfo().then((a) => {
    return a;
  });
  res.send(b2);
};

module.exports = {
  getNewRequest,
  getAllUser,
  getPostCount,
  getAboutInfo,
};
