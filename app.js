const express = require("express");
const app = express();
const dogsEndpoint = require("./dogs-list");

const port = 8000;

app.use(express.json());

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/sources", express.static(__dirname + "/public"));

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
  res.render("index");
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
  .post(express.json({ inflate: true }), function (req, res) {
    console.log(req.body);
    res.status(200).send("recibido");
  });

app.listen(port, function () {
  console.log(`El servidor esta escuchando en http://localhost:${port}`);
});
