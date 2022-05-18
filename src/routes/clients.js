import Control from "../controllers/client.js";

import express from "express";
const clientRoutes = express.Router();

// clientRoutes.get("/clients", Client.all);
// clientRoutes.get("/clients/:id", Client.show);
clientRoutes.post("/clients", Control().create);
// clientRoutes.put("/clients/:id", Client.update);
// clientRoutes.delete("/clients/:id", Client.destroy);

export default clientRoutes;
