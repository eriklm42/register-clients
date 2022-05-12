import mongoose from "mongoose";
import valid from "./validation";
import stateList from "../util/stateList"

const states = stateList.map(state => state.key)

const schemaValidation = valid.object({
    action: valid.string(),
    _id: valid.string().when(valid.ref("action"), {
        is: valid.alternatives("update"),
        then: valid.required(),
    }),
    name: valid.string().when(valid.ref("action"), {
        is: valid.alternatives("create"),
        then: valid.required(),
    }),
    street: valid.string().when(valid.ref("action"), {
        is: valid.alternatives("create"),
        then: valid.required(),
    }),
    number: valid.number().when(valid.ref("action"), {
        is: valid.alternatives("create"),
        then: valid.required(),
    }),
    neighborhood: valid.string().when(valid.ref("action"), {
        is: valid.alternatives("create"),
        then: valid.required(),
    }),
    city: valid.string().when(valid.ref("action"), {
        is: valid.alternatives("create"),
        then: valid.required(),
    }),
    state: valid.alternatives(states).when(valid.ref("action"), {
        is: valid.alternatives("create"),
        then: valid.required(),
    }),
    country: valid.string().when(valid.ref("action"), {
        is: valid.alternatives("create"),
        then: valid.required(),
    }),
    postalCode: valid.number().when(valid.ref("action"), {
        is: valid.alternatives("create"),
        then: valid.required(),
    })
    }).required()


const schema = {
    name: mongoose.Schema.Types.String,
    street: mongoose.Schema.Types.String,
    number: mongoose.Schema.Types.Number,
    neighborhood: mongoose.Schema.Types.String,
    city: mongoose.Schema.Types.String,
    state: mongoose.Schema.Types.String,
    country: mongoose.Schema.Types.String,
    postalCode: mongoose.Schema.Types.Number,
}

const index = {
    name: "text",
    street: "text",
    number: "number",
    neighborhood: "text",
    city: "text",
    state: "text",
    country: "text",
    postalCode: "number",
};

const weights = {
    name: "addressindx",
    weights: {
        name: 30,
        street: 20,
        number: 4,
        neighborhood: 12,
        city: 18,
        state: 2,
        country: 14,
        postalCode: 8,
    },
};

const model = new mongoose.Schema(schema, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, strict: false });

model.index(index, weights);
model.statics.customValidate = async obj => valid.attempt(obj, schemaValidation);

const name = "Address";
const collection = "address";

export default conn => conn.model(name, model, collection);