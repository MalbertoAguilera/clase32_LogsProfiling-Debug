const express = require("express");
const { Router } = express;
const routerInfo = new Router();
const numCPU = require("os").cpus().length;
const objectInfo = require("../config/ObjectInfo");

routerInfo.get("/info", (req, res) => {
  objectInfo["qtyOfCPU"] = numCPU;
  res.json(objectInfo);
});

module.exports = routerInfo;
