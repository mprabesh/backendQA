const mongoose = require("mongoose");
const dbSchema = require("../dbSchemas/allSchema");
const mongoConnect = require("../controllers/mongoConnect");
const answerModel = new mongoose.model("answerinfo", dbSchema.answerSchema);

const question_getall = async (req, res) => {
  mongoConnect();
  const QuestionModel = new mongoose.model("postinfo", dbSchema.postSchema);

  const getAll = async () => {
    try {
      var result1 = await QuestionModel.find();
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
const question_add = (req, res) => {
  const value = req.body.values;
  console.log(value);
  mongoConnect();
  const QuestionModel = new mongoose.model("postinfo", dbSchema.postSchema);
  const createDocument = async () => {
    try {
      const myData = new QuestionModel({
        name: value.name,
        Question: value.Question,
      });
      const result = await myData.save();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  createDocument();
};

const question_getSpecific = async (req, res) => {
  console.log(req.params.name);
  const name = req.params.name;
  mongoConnect();
  const QuestionModel = new mongoose.model("postinfo", dbSchema.postSchema);
  const getAll = async () => {
    try {
      var result1 = await QuestionModel.find({ name: name });
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
const question_delete = (req, res) => {
  const ID = req.body.id;

  console.log(ID);

  mongoConnect();
  const QuestionModel = new mongoose.model("postinfo", dbSchema.postSchema);
  const deleteSpecific = async () => {
    const credentials = { _id: ID };
    try {
      await QuestionModel.deleteOne(credentials);
      await answerModel.deleteMany({ QuestionID: ID });
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  };
  deleteSpecific();
};

module.exports = {
  question_add,
  question_getall,
  question_getSpecific,
  question_delete,
};
