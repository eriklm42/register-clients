import mongoose from "mongoose";

// import env from "../configs/envs/env.js";

const MONGODB_URI = process.env.MONGO_CONNECTION_STRING;

export const createConnection = () => {
  console.log({ MONGODB_URI });
  return mongoose.createConnection(MONGODB_URI);
};

export const getConnection = () => createConnection();
