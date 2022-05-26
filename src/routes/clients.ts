import Control from "../controllers/client.js";

import express from "express";
const clientRoutes = express.Router();

clientRoutes.get("/clients/:id", Control().find);
clientRoutes.post("/clients", Control().create);
clientRoutes.put("/clients/:id", Control().update);
clientRoutes.delete("/clients/:id", Control().remove);

export default clientRoutes;
