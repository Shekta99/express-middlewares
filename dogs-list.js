const perros = [
  { nombre: "firulais", raza: "pomerania" },
  { nombre: "diablo", raza: "pastor aleman" },
  { nombre: "mordisco", raza: "criollo" },
  { nombre: "scooby doo", raza: "pitbull" },
  { nombre: "zultan", raza: "doberman" },
  { nombre: "Jeyking", raza: "labrador" },
  { nombre: "Matador salas", raza: "Pincher" },
];

const express = require("express");
const dogsEndpoint = express.Router();

function dogsListMethods(req, res, next) {
  const method = req.method;
  if (method === "GET") {
    next();
  } else {
    res.status(405).send("Invalid http request method");
  }
}

function urlValidation(req, res, next) {
  req.headers = { ...req.headers, user: "sergio" };
  next();
}

dogsEndpoint.use(dogsListMethods);

dogsEndpoint.get("/es", urlValidation, function (req, res) {
  const nombres = perros.map((perro) => perro.nombre);
  const cadenaNombres = nombres.join(", ");
  res.send("Hola " + req.headers.user + " Lista de perros: " + cadenaNombres);
});

dogsEndpoint.get("/en", function (req, res) {
  const nombres = perros.map((perro) => perro.nombre);
  const cadenaNombres = nombres.join(", ");
  res.send("Dogs list: " + cadenaNombres);
});

dogsEndpoint.get("/&:limit", function (req, res) {
  const limit = parseInt(req.params.limit);
  const nombres = perros.map((perro) => perro.nombre);
  const cadenaNombres = nombres.slice(0, limit).join(", ");
  res.send("Lista de perros: " + cadenaNombres);
});

module.exports = dogsEndpoint;
