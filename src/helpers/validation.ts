import Joi from "joi";
import { isValidObjectId } from "mongoose";

const objectId = joiInst => ({
    type: "objectId",
    base: joiInst.string().custom((value, helpers) => (isValidObjectId(value) ? value : helpers.error("any.invalid"), "Mongo objectId string"),
})

const extendJoi = Joi.extend(objectId)

export default extendJoi;