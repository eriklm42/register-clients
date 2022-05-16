import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

export const createConnection = () => {
    return mongoose.createConnection(MONGODB_URI, {
        useNewUrlParserw: true,
        useUnifiedTopology: false,
        useFindAndModify: false,
        useCreateIndex: true,
        bufferCommands: false,
        bufferMaxEntries: 0,
    })
}

