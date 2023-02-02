const express = require("express");
const api = express();
const usersEndpoint = require("./src/users/users");
const meetingsEndpoint = require("./src/meetings/meetings");

const port = 8000;

api.use(express.json());

api.use(bodyValidation);

api.use("/api/users", usersEndpoint);
api.use("/api/meetings", meetingsEndpoint);

function bodyValidation(req, res, next) {
  if (
    Object.values(req.body).length === 0 &&
    req.method !== "GET" &&
    req.method !== "DELETE"
  ) {
    res.status(400).json({ error: "Body is null" });
  } else {
    next();
  }
}

function methods(req, res, next) {
  const method = req.method;
  if (
    method === "POST" ||
    method === "GET" ||
    method === "PUT" ||
    method === "DELETE"
  ) {
    next();
  } else {
    res.status(405).json({ message: "Invalid http request method" });
  }
}

api.use(methods);

api.get("/api", function (req, res) {
  res.json({ message: "Bienvenido al API de agenda" });
});

api.listen(port, function () {
  console.log(`El servidor esta escuchando en http://localhost:${port}`);
});
