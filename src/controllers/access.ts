import Actions from "../actions/index.js";
import { getConnection } from "../helpers/mongoDB.js";
import modelClient from "../models/clients.js";
import Jwt from "../helpers/jwt.js";
import validationError from "../helpers/error.js";

const conn = getConnection();
const Client = modelClient(conn);

const Control = () => {
  const login = async (req, res) => {
    try {
      req.body.password = Jwt().hashPassoword(req.body.password);

      const infoLogin = { email: req.body.email, password: req.body.password };
      const response = await Actions().findOne(Client, infoLogin);

      if (!response) throw new Error("Bad credentials");

      const token = await Jwt().generateToken(infoLogin);

      res.status(200).send({ token });
    } catch (error) {
      validationError(error, res);
    }
  };

  return {
    login,
  };
};

export default Control;
