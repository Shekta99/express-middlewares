const express = require("express");
const app = express();
const dogsEndpoint = require("./dogs-list");
const usersEndpoint = require("./src/users/users");
const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config();

const port = 8000;

const users = [
  { email: "example@example.com", name: "example", rol: "admin" },
  { email: "test@test.com", name: "test", rol: "user" },
];

app.use(express.json());

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/sources", express.static(__dirname + "/public"));

app.use("/dogs-list", dogsEndpoint);
app.use("/api/users", usersEndpoint);

function bodyValidation(req, res, next) {
  if (Object.values(req.body).length === 0) {
    res.status(400).send("Body is null");
  } else {
    next();
  }
}

function protect(req, res, next) {
  const token = req.header("Authorization");
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.rol === "admin") {
      next();
    } else {
      res.status("403").json({ error: "Access not allowed" });
    }
  } catch (error) {
    res.json({ error });
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
  const credentials = req.body.email;
  const userInfo = users.filter((user) => {
    if (user.email === credentials) {
      return true;
    } else {
      return false;
    }
  });
  if (userInfo.length !== 0) {
    token = jwt.sign(
      {
        name: userInfo[0].name,
        rol: userInfo[0].rol,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      process.env.SECRET_KEY,
      {
        algorithm: "HS256",
      }
    );
    res.json({ token });
  } else {
    res
      .status(401)
      .json({ error: "Doesn't exist any user with this email account" });
  }
});

app.get("/protect", protect, function (req, res) {
  res.send("paso");
});

app.get("/protect-2", protect, function (req, res) {
  res.send("paso2");
});

/*
db.then(async (db) => {
  const collectionUsers = db.collection("users");
  const findResult = await collectionUsers.find({}).toArray();
  console.log("Found documents =>", findResult);
});
*/

app.listen(port, function () {
  console.log(`El servidor esta escuchando en http://localhost:${port}`);
});
