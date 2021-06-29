const mongoose = require("mongoose");
const dbSchema = require("../dbSchemas/allSchema");
const mongoConnect = require("../controllers/mongoConnect");

// while getting data from frontend we may end
// up in different format of data here we assume it to be of form {"field1":"cxcxc","field2":"sasdasd"}
//if frontend is of form {value} then we need to make it req.body.value instead of req.body used here
//---------------------------**************************************************************************
//this API send request to add user in the app so for accepting new api is written
const newRegister = (req, res) => {
  const data = req.body.userInfo;
  mongoConnect();
  const newRequestModel = new mongoose.model(
    "newRequestinfo",
    dbSchema.newRequestSchema
  );
  const createDocument = async () => {
    try {
      const myData = new newRequestModel({
        Firstname: data.firstname,
        Lastname: data.lastname,
        Email: data.email,
        Gender: data.gender,
        Password: data.password,
      });
      const result = await myData.save();
      console.log(result);
      console.log("Successful");
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  };
  createDocument();
};

//this api adds user in the app from new request .
const acceptUser = (req, res) => {
  const data = req.body.a;
  console.log(data);
  mongoConnect();
  const userInfoModel = new mongoose.model("userinfo", dbSchema.userSchema);
  const createDocument = async () => {
    try {
      const myData = new userInfoModel({
        firstname: data.Firstname,
        lastname: data.Lastname,
        email: data.Email,
        gender: data.Gender,
        password: data.Password,
        about: "",
      });
      const result = await myData.save();
      console.log(result);
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  };
  createDocument();
};

const removeNewRegister = (req, res) => {
  const emailID = req.body.d;
  console.log(emailID);
  mongoConnect();
  const newRequestModel = new mongoose.model(
    "newRequestinfo",
    dbSchema.newRequestSchema
  );
  const deleteSpecific = async () => {
    try {
      await newRequestModel.deleteOne({ Email: emailID });
      res.send(200);
    } catch (err) {
      res.send(err);
    }
  };
  deleteSpecific();
};
const removeUser = (req, res) => {
  const d = req.body.a;
  // console.log("dfsdjfkjhdkfjshjdhfkshdjkfskdfsjkfjskhjdfskdfjhskfhjskdf");
  // console.log(d);
  // console.log("dfsdjfkjhdkfjshjdhfkshdjkfskdfsjkfjskhjdfskdfjhskfhjskdf");
  const Name = d.FirstName + " " + d.LastName;
  console.log(Name);

  mongoConnect();
  const userModel = new mongoose.model("userinfo", dbSchema.userSchema);
  const answerModel = new mongoose.model("answerinfo", dbSchema.answerSchema);
  const questionModel = new mongoose.model("postinfo", dbSchema.postSchema);
  const deleteSpecific = async () => {
    try {
      await userModel.deleteOne({ email: d.Email });
      await answerModel.deleteMany({ name: Name });
      await questionModel.deleteMany({ name: Name });
      console.log("cleared");
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  };
  deleteSpecific();
};
//Update the about info in the profile from this API
const addAboutInfo = async (req, res) => {
  const data = req.body.value;
  console.log(data);
  mongoConnect();
  const userModel = new mongoose.model("userinfo", dbSchema.userSchema);
  const updateField = async () => {
    try {
      await userModel.updateOne(
        { _id: data.UID },
        { $set: { about: data.about } }
      );
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  };
  updateField();
};

module.exports = {
  removeNewRegister,
  acceptUser,
  newRegister,
  addAboutInfo,
  removeUser,
};
