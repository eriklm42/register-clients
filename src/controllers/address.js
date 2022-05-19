import Actions from "../actions/index.js";
import { getConnection } from "../helpers/mongoDB.js";
import modelAddress from "../models/address.js";

const conn = getConnection();
const Address = modelAddress(conn);

const Control = () => {
  const create = async (req, res) => {
    try {
      const response = await Actions().create(Address, req.body);
      if (res) res.status(200).send(response);
      return response;
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  const find = async (query = { _id: req.params.id }, res) => {
    try {
      const response = await Actions().findOne(Address, query);
      if (res) res.status(200).send(response);
      return response;
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  const update = async (req, res) => {
    try {
      const response = await Actions().update(Address, { _id: req.params.id }, req.body);
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  const remove = async (req, res) => {
    try {
      const response = await Actions().update(Address, { _id: req.params.id }, { active: false });
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
