import mongoose from "mongoose";
import { registerModels } from "../models/index.js";

const MONGODB_URI = process.env.MONGO_CONNECTION_STRING;

export const createConnection = () => {
  const conn = mongoose.createConnection(MONGODB_URI);
  registerModels(conn);
  return conn;
};

export const getConnection = () => createConnection();
