//configuracion websocket
const express = require("express");
const res = require("express/lib/response");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
// FIN configuracion websocket

const Contenedor = require("./class/Contenedor");
const filePathProducts = "./db/productos.txt";
const filePathMessages = "./db/messages.txt";
const handlerProducts = new Contenedor(filePathProducts);
const handlerMessages = new Contenedor(filePathMessages);
const listarMensajesNormalizados = require("./utils/listarMensajesNormalizados");
const objectSession = require("./config/session");
const session = require("express-session");

const dotenv = require("dotenv").config();


//-----------rutas
const routeNumAleatorios = require("./routes/numerosAleatorios");
const routeInfo = require("./routes/routeInfo");
const routeProductosTest = require("./routes/routeProductosTest");
const routeLogin = require("./routes/routeLogin");
//-----------rutas

const cluster = require("cluster");
const numCPU = require("os").cpus().length;
const parseArg = require("minimist");

const options = { default: { port: 8080 } };
const objectMinimist = parseArg(process.argv.slice(2), options);
const PORT = objectMinimist.port; //pasar como --port=(numero)
const modoCluster = objectMinimist.modo ==="cluster";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(session(objectSession));

if (modoCluster && cluster.isMaster) {
  for (let index = 0; index < numCPU; index++) {
    cluster.fork();
  }
} else {

  app.use(routeNumAleatorios);
  app.use(routeInfo);
  app.use(routeProductosTest);
  app.use(routeLogin);
  

  //websocket
  //abre canal de parte del servidor
  //connection EVENTO
  io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    //Socket PRODUCTOS
    socket.emit("server_sendProducts", await handlerProducts.getAll());

    socket.on("client_newProduct", async (item) => {
      await handlerProducts.save(item);
      io.emit("server_sendProducts", await handlerProducts.getAll());
    });
    //FIN Socket PRODUCTOS

    //Socket MENSAJES
    socket.emit(
      "server_sendMessages",
      listarMensajesNormalizados(await handlerMessages.getAll())
    );

    socket.on("client_newMessage", async (objmessage) => {
      await handlerMessages.save(objmessage);
      io.emit(
        "server_sendMessages",
        listarMensajesNormalizados(await handlerMessages.getAll())
      );
    });
  });


  server.listen(PORT, () => {
    console.log(`El servidor se encuentra escuchando por el puerto ${server.address().port} --- PID ${process.pid}`);
  });
  server.on("error", (error) => console.log(`Error en servidor ${error}`));
}
