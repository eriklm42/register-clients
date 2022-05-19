import Actions from "../actions/index.js";
import { getConnection } from "../helpers/mongoDB.js";
import modelClient from "../models/clients.js";
import addressControl from "./address.js";
import Jwt from "../helpers/jwt.js";

const conn = getConnection();
const Client = modelClient(conn);

const Control = () => {
  const create = async (req, res) => {
    try {
      const createAddress = await addressControl().create({ body: req.body.address[0] });

      if (!createAddress) throw new Error("Error in create your address");

      const newAddress = await addressControl().find({
        $and: [{ postalCode: req.body.address[0].postalCode, number: req.body.address[0].number }],
      });

      req.body.address[0] = newAddress._id;

      if (!req.body.password) throw new Error("Password was not provided");

      req.body.password = Jwt().hashPassoword(req.body.password);

      const newClient = await Actions().create(Client, req.body);

      const response = await Actions().findOne(Client, { _id: newClient._id }, { path: "address", model: "Address" });

      res.status(200).send(response);
    } catch (error) {
      console.error({ error });
      res.status(500).send(error);
    }
  };

  const find = async (req, res) => {
    try {
      const response = await Actions().findOne(Client, { _id: req.params.id });
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  const update = async (req, res) => {
    try {
      const response = await Actions().update(Client, { _id: req.params.id }, req.body);
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  const remove = async (req, res) => {
    try {
      const response = await Actions().update(Client, { _id: req.params.id }, { active: false });
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
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
