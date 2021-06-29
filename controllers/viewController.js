const mongoose = require("mongoose");
const dbSchema = require("../dbSchemas/allSchema");
const mongoConnect = require("../controllers/mongoConnect");
const questionModel = new mongoose.model("postinfo", dbSchema.postSchema);

const getViewArray = async (req, res) => {
  const ID = req.params.ID;
  console.log(ID);
  mongoConnect();
  const getAll = async () => {
    try {
      var result1 = await questionModel.findOne({
        _id: ID,
      });
      return result1.Views;
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
const addView = (req, res) => {
  const data = req.body.value;

  mongoConnect();
  const addData = async () => {
    try {
      await questionModel.updateOne(
        { _id: data.ID },
        { $push: { Views: data.UserName } }
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  };
  addData();
};

module.exports = { getViewArray, addView };
