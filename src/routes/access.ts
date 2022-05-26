import Control from "../controllers/access.js";

import express from "express";
const accessRoutes = express.Router();

accessRoutes.post("/login", Control().login);

export default accessRoutes;
