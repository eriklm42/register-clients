import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

const createConnection = () => {
    return mongoose.createConnection(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: false,
        useFindAndModify: false,
        useCreateIndex: true,
        bufferCommands: false,
        bufferMaxEntries: 0,
    })
}

export { createConnection }