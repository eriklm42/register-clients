import mongoose from "mongoose";
import valid from "../helpers/validation.js";

export const schemaValidation = valid.object({
  action: valid.string(),
  _id: valid.string().when(valid.ref("action"), {
    is: valid.alternatives("update"),
    then: valid.required(),
  }),
  name: valid.string().when(valid.ref("action"), {
    is: valid.alternatives("create"),
    then: valid.required(),
  }),
  document: valid.string().when(valid.ref("action"), {
    is: valid.alternatives("create"),
    then: valid.required(),
  }),
  birth_date: valid.date().when(valid.ref("action"), {
    is: valid.alternatives("create"),
    then: valid.required(),
  }),
  password: valid.string().when(valid.ref("action"), {
    is: valid.alternatives("create"),
    then: valid.required(),
  }),
  address: valid.array().when(valid.ref("action"), {
    is: valid.alternatives("create"),
    then: valid.required(),
  }),
});

const schema = {
  name: mongoose.Schema.Types.String,
  document: mongoose.Schema.Types.String,
  birth_date: mongoose.Schema.Types.Date,
  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
};

const index = {
  name: "text",
  document: "text",
  birth_date: "date",
};

const weights = {
  name: "clientindx",
  weights: {
    name: 30,
    document: 18,
    birth_date: 9,
  },
};

const model = new mongoose.Schema(schema, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at", active: true },
  strict: false,
});

model.index(index, weights);
model.statics.customValidate = async (obj) => valid.attempt(obj, schemaValidation);

const name = "Clients";
const collection = "clients";

export default (conn) => conn.model(name, model, collection);
