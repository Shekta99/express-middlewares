const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
  age: { type: Number, required: true },
  name: { type: String, required: true },
});

const UserModel = model("users", userSchema);

module.exports = UserModel;
