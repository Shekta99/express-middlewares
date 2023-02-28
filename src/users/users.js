const express = require("express");
const usersEndpoint = express.Router();
const connectDb = require("../../dbMongoose");
const UserModel = require("../models/users");

const createUser = async (data) => {
  await connectDb();
  const newUser = new UserModel({ age: Number(data.age), name: data.name });
  await newUser.save();
  return newUser;
};

usersEndpoint.get("/", function (req, res) {
  res.status(200).json({ users: users });
});

usersEndpoint.post("/", function (req, res) {
  const data = req.body;
  if (data.age !== undefined && data.name !== undefined) {
    createUser(data).then((data) => {
      res.status(201).json({ createdUser: data });
    });
  } else {
    res.status(400).json({ error: "age and name is required" });
  }
});

usersEndpoint.put("/:id", function (req, res) {
  const id = req.params.id;
  const data = req.body;
  users[id] = data;
  res.status(200).json({ updatedUser: users[id] });
});

usersEndpoint.delete("/:id", function (req, res) {
  const id = req.params.id;
  const data = users[id];
  users.splice(id, 1);
  res.status(200).json({ deletedUser: data });
});

usersEndpoint.get("/:id", function (req, res) {
  const id = req.params.id;
  res.status(200).json({ user: users[id] });
});

module.exports = usersEndpoint;
