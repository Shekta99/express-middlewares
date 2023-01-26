const express = require("express");
const app = express();
const dogsEndpoint = require("./dogs-list");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const users = [{ email: "example@example.com", name: "example" }];

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

app.post("/auth", function (req, res) {
  const userInfo = users.map((user) => {
    if (user.email == req.body.email) {
      return user;
    }
  });
  if (userInfo.length === 0) {
    res.status(401).send({ error: "Invalid user name or password" });
  } else {
    const token = jwt.sign(userInfo[0], process.env.SECRET_KEY);

    res.json({ token });
  }
});

app.get("/protect", function (req, res) {
  const token = req.header("Authorization");
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    res.send("autenticado");
  } catch (e) {
    res.json({ e });
  }
});

app.listen(port, function () {
  console.log(`El servidor esta escuchando en http://localhost:${port}`);
});
