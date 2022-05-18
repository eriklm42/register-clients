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

  const find = async (query, res) => {
    try {
      const response = await Actions().find(Address, query);
      console.log({ response });
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  return {
    create,
    find,
  };
};

export default Control;
