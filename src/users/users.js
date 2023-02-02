const express = require("express");
const usersEndpoint = express.Router();

const users = [
  { email: "example@example.com", name: "example" },
  { email: "test@test.com", name: "test" },
];

usersEndpoint.get("/", function (req, res) {
  res.status(200).json({ users: users });
});

usersEndpoint.post("/", function (req, res) {
  const data = req.body;
  users.push(data);
  res.status(201).json({ createdUser: data });
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
