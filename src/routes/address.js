import Control from "../controllers/address.js";

import express from "express";
const addressRoutes = express.Router();

addressRoutes.get("/address/:id", Control().find);
addressRoutes.post("/address", Control().create);
addressRoutes.put("/address/:id", Control().update);
addressRoutes.delete("/address/:id", Control().remove);

export default addressRoutes;
