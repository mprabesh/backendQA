const mongoose = require("mongoose");
const dbSchema = require("../dbSchemas/allSchema");
const mongoConnect = require("../controllers/mongoConnect");
const answerModel = new mongoose.model("answerinfo", dbSchema.answerSchema);

const answer_add = async (req, res) => {
  const value = req.body.values;

  mongoConnect();
  const createDocument = async () => {
    try {
      const myData = new answerModel({
        name: value.name,
        Answer: value.Answer,
        QuestionID: value.QuestionID,
      });
      const result = await myData.save();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  createDocument();
};
const answer_remove = (req, res) => {
  const ID = req.body.id;

  mongoConnect();
  const deleteSpecific = async () => {
    const credentials = { _id: ID };
    try {
      await answerModel.deleteOne(credentials);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  };
  deleteSpecific();
};
const answer_specific = async (req, res) => {
  const ID = req.params.QID;
  console.log(ID);
  mongoConnect();
  const findSpecific = async () => {
    const credentials = { QuestionID: ID };
    try {
      const hell = await answerModel.find(credentials);
      return hell;
    } catch (err) {
      console.log(err);
    }
  };
  const b2 = await findSpecific().then((a) => {
    return a;
  });
  res.send(b2);
};

module.exports = { answer_add, answer_remove, answer_specific };
