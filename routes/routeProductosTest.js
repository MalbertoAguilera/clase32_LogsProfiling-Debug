const express = require("express");
const { Router } = express;
const routerProductosTest = new Router();
const generarUsuarios = require("../utils/generarUsuarios");

routerProductosTest.get("/api/productos-test", (req, res) => {
  res.json(generarUsuarios());
});

module.exports = routerProductosTest;
