import express from "express";
import cors from "cors";
import { createConnection } from "./helpers/mongoDB.js";
import clientRoutes from "./routes/clients.js";
import addressRoutes from "./routes/address.js";
import accessRoutes from "./routes/access.js";

const server = express();
server.use(express.json());
server.use(cors());

server.use(process.env.PATH_DEAFULT, clientRoutes);
server.use(process.env.PATH_DEAFULT, addressRoutes);
server.use(process.env.PATH_DEAFULT, accessRoutes);

await createConnection();

server.listen(process.env.PORT_DEFAULT, () => {
  console.log("Service started at port " + process.env.PORT_DEFAULT);
});
