const express = require("express");
const meetingsEndpoint = express.Router();

const meetings = [
  { nombre: "example", hora: "6pm" },
  { nombre: "test", hora: "5pm" },
  { nombre: "test", hora: "6pm" },
  { nombre: "test", hora: "7pm" },
  { nombre: "example", hora: "3pm" },
  { nombre: "example", hora: "2pm" },
  { nombre: "test", hora: "1pm" },
];

meetingsEndpoint.get("/", function (req, res) {
  res.json({ meetings: meetings });
});

module.exports = meetingsEndpoint;
