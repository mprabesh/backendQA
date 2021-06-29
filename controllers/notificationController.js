const mongoose = require("mongoose");
const dbSchema = require("../dbSchemas/allSchema");
const mongoConnect = require("../controllers/mongoConnect");

const getNotification = async (req, res) => {
  const data = req.params.name;
  mongoConnect();
  const nModel = new mongoose.model(
    "notificationinfo",
    dbSchema.notificationSchema
  );
  const getData = async () => {
    try {
      const nData = await nModel.find({ notifyID: data });
      return nData;
    } catch (err) {
      console.log(err);
    }
  };
  const b2 = await getData().then((a) => {
    return a;
  });
  res.send(b2);
};

const markNotification = (req, res) => {
  const data = req.body.ID;

  mongoConnect();
  const nModel = new mongoose.model(
    "notificationinfo",
    dbSchema.notificationSchema
  );
  const updateMark = async () => {
    try {
      await nModel.updateOne({ _id: data }, { $set: { marked: true } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  };
  updateMark();
};

const addNotification = (req, res, next) => {
  const data = req.body.values;
  console.log("asjhdahdjhaksdhjkahdkjahkjdhkajshj");
  mongoConnect();
  const nModel = new mongoose.model(
    "notificationinfo",
    dbSchema.notificationSchema
  );
  const qModel = new mongoose.model("postinfo", dbSchema.postSchema);
  const saveNotification = async () => {
    try {
      const name = await qModel.findOne(
        { _id: data.QuestionID },
        (result, err) => {
          if (result) {
            return result.name;
          }
        }
      );
      const myData = new nModel({
        generateID: data.name,
        notifyID: name.name,
        notifyType: "answered your post",
        marked: false,
        QuestionContent: name.Question,
      });
      const result = await myData.save();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  saveNotification();
  next();
};
const rmvNotification = () => {};
const getNotificationCount = async (req, res) => {
  const data = req.params.name;
  console.log(data);
  mongoConnect();
  const nModel = new mongoose.model(
    "notificationinfo",
    dbSchema.notificationSchema
  );
  const getData = async () => {
    try {
      const nData = await nModel.countDocuments({
        notifyID: data,
        marked: false,
      });
      const aData = await nModel.find({ notifyID: data, marked: false });
      return { nCount: nData, unmarked: aData };
    } catch (err) {
      console.log(err);
    }
  };
  const b2 = await getData()
    .then((a) => {
      return a;
    })
    .catch((err) => {
      console.log(err);
    });
  res.send(b2);
};

module.exports = {
  getNotification,
  getNotificationCount,
  markNotification,
  addNotification,
  rmvNotification,
};
