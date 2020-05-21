import Server from "./server/server";
import router from "./router/router";
import MySQL from "./mysql/mysql";

const server = Server.init(8002);

// MySql instance
// MySQL.instance;

server.app.use(router);

server.start(() => {
  console.log("Servidor corriendo en el puerto 8002");
});
