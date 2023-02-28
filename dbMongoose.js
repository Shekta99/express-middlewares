const mongoose = require("mongoose");
const env = require("dotenv");

env.config();

const connectDb = async () => {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Mongodb database connected");
    })
    .catch(() => {
      console.log("Mongodb database failed to connect");
    });
};

module.exports = connectDb;
