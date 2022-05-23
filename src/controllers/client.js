import Actions from "../actions/index.js";
import { getConnection } from "../helpers/mongoDB.js";
import modelClient from "../models/clients.js";
import addressControl from "./address.js";
import Jwt from "../helpers/jwt.js";
import validationError from "../helpers/error.js";
import modelAddress from "../models/address.js";

const conn = getConnection();
const Client = modelClient(conn);
const Address = modelAddress(conn);

const Control = () => {
  const create = async (req, res) => {
    try {
      const address = req.body.address[0];
      delete req.body.address[0];

      req.body.password = Jwt().hashPassoword(req.body.password);

      const newClient = await Actions().create(Client, { ...req.body, active: true });

      const newAddress = await Actions().create(Address, address);

      await Actions().update(Client, { _id: newClient._id }, { address: newAddress._id });

      const response = await Actions().findOne(Client, { _id: newClient._id }, { path: "address", model: "Address" });

      if (res) res.status(200).send(response);
      return response;
    } catch (error) {
      validationError(error, res);
    }
  };

  const find = async (req, res, query = { _id: req.params.id }) => {
    try {
      await Jwt().verifyToken(req.headers.authorization || req.headers.Autorization);

      const response = await Actions().findOne(Client, query, { path: "address", model: "Address" });
      if (res) res.status(200).send(response);
      return response;
    } catch (error) {
      validationError(error, res);
    }
  };

  const update = async (req, res) => {
    try {
      Jwt().verifyToken(req.headers.authorization || req.headers.Autorization);

      const response = await Actions().update(Client, { _id: req.params.id }, req.body);

      if (res) res.status(200).send(response);
      return response;
    } catch (error) {
      validationError(error, res);
    }
  };

  const remove = async (req, res) => {
    try {
      Jwt().verifyToken(req.headers.authorization || req.headers.Autorization);

      await Actions().update(Client, { _id: req.params.id }, { active: false });

      if (res) res.status(200).send("Client successfully removed");
      return response;
    } catch (error) {
      validationError(error, res);
    }
  };

  return {
    create,
    find,
    update,
    remove,
  };
};

export default Control;
