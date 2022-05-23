import Actions from "../actions/index.js";
import { getConnection } from "../helpers/mongoDB.js";
import modelAddress from "../models/address.js";
import modelClient from "../models/clients.js";
import clientControl from "./client.js";
import Jwt from "../helpers/jwt.js";
import validationError from "../helpers/error.js";

const conn = getConnection();
const Address = modelAddress(conn);
const Client = modelClient(conn);

const Control = () => {
  const create = async (req, res) => {
    try {
      await Jwt().verifyToken(req.headers.authorization || req.headers.Autorization);

      const clientId = req.body.clientId;
      delete req.body.clientId;

      const response = await Actions().create(Address, req.body);

      if (!clientId) throw new Error("Inform the clientId");

      await Actions().update(Client, { _id: clientId }, { $push: { address: response._id } });

      if (res) res.status(200).send(response);
      return response;
    } catch (error) {
      validationError(error, res);
    }
  };

  const find = async (req, res, query = { _id: req.params.id }) => {
    try {
      await Jwt().verifyToken(req.headers.authorization || req.headers.Autorization);

      const response = await Actions().findOne(Address, query);

      if (res) res.status(200).send(response);
      return response;
    } catch (error) {
      validationError(error, res);
    }
  };

  const findAll = async (req, res) => {
    try {
      await Jwt().verifyToken(req.headers.authorization || req.headers.Autorization);

      const { address } = await clientControl().find(req, undefined, { _id: req.params.id });

      if (res) res.status(200).send(address);
      return address;
    } catch (error) {
      validationError(error, res);
    }
  };

  const update = async (req, res) => {
    try {
      await Jwt().verifyToken(req.headers.authorization || req.headers.Autorization);

      const response = await Actions().update(Address, { _id: req.params.id }, req.body);

      if (res) res.status(200).send(response);
      return response;
    } catch (error) {
      validationError(error, res);
    }
  };

  const remove = async (req, res) => {
    try {
      await Jwt().verifyToken(req.headers.authorization || req.headers.Autorization);

      await Actions().update(Client, { address: req.params.id }, { $pull: { address: req.params.id } });

      const response = await Actions().remove(Address, { _id: req.params.id });

      if (res) res.status(200).send("Address successfully removed");
      return response;
    } catch (error) {
      validationError(error, res);
    }
  };

  return {
    create,
    update,
    remove,
    findAll,
    find,
  };
};

export default Control;
