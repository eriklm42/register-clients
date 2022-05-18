import Actions from "../actions/index.js";
import { getConnection } from "../helpers/mongoDB.js";
import modelClient from "../models/clients.js";
import addressControl from "./address.js";

const conn = getConnection();
const Client = modelClient(conn);

const Control = () => {
  const create = async (req, res) => {
    try {
      const createAddress = await addressControl().create({ body: req.body.address[0] }, res);

      if (!createAddress) throw new Error("Error in create your address");

      console.log({ postalCode: req.body.address[0].postalCode, number: req.body.address[0].number });

      const newAddress = await addressControl().find(
        { $and: [{ postalCode: req.body.address[0].postalCode, number: req.body.address[0].number }] },
        res
      );

      console.log(newAddress);

      // req.body.address[0] = newAddress._id;

      // const response = await Actions().create(Client, req.body);

      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  return {
    create,
  };
};

export default Control;
