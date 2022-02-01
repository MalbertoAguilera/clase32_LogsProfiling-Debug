const express = require("express");
const {Router} = express;
const routerApiRandom = new Router();
const {fork} = require("child_process");

routerApiRandom.get("/api/randoms", (req, res) => {
	let cantidad = req.query.cant || "100000000";
	const random = fork("./api/apiAleatorios.js");
	random.send(cantidad);
	random.on("message", (objRepetidos) => {
		res.json(objRepetidos);
	});
});

module.exports = routerApiRandom;