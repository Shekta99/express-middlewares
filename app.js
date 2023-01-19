const express = require("express");
const app = express();
const dogsEndpoint = require("./dogs-list");

const port = 8000;

app.use(express.json());

app.use("/dogs-list", dogsEndpoint);

function bodyValidation(req, res, next) {
  if (Object.values(req.body).length === 0) {
    res.status(400).send("Body is null");
  } else {
    next();
  }
}

function methods(req, res, next) {
  const method = req.method;
  if (method === "POST" || method === "GET") {
    next();
  } else {
    res.status(405).send("Invalid http request method");
  }
}

app.use("/", methods);

app.get("/", function (req, res) {
  res.status(200).send("Hola mundo");
  res.end();
});

app.post("/", bodyValidation, function (req, res) {
  const data = req.body;
  console.log(data.edad);
  res.status(200).send("recibido");
});

app
  .route("/ada-school&:name/saludo")
  .get(function (req, res) {
    const name = req.params.name;
    res.send(`Hola ${name}, somos ADA School`);
    res.end();
  })
  .post(express.json(), function (req, res) {
    res.status(200).send("recibido");
  });

app.listen(port, function () {
  console.log(`El servidor esta escuchando en http://localhost:${port}`);
});
