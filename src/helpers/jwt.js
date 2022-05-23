import jwt from "jsonwebtoken";
import crypto from "crypto";

const Jwt = () => {
  const defaultTokenOptions = {
    algorithm: "HS256",
  };

  const generateToken = async (dataPayload, type = "login", customGenerateTokenOptions = {}) => {
    return new Promise((resolve, reject) => {
      const options = { ...defaultTokenOptions, ...customGenerateTokenOptions };
      const payload = { type, data: dataPayload };

      jwt.sign(payload, process.env.TOKEN_KEY, options, (err, token) => {
        if (err) throw new Error(err);
        resolve(token);
      });
    });
  };

  const verifyToken = async (token, type = "login", customValidateTokenOptions = {}) => {
    return new Promise((resolve, reject) => {
      const options = { ...defaultTokenOptions, ...customValidateTokenOptions };
      if (!token) throw new Error("Inform the barer token");
      if (token.search(" ") > 0) token = token.split(" ")[1];

      jwt.verify(token, process.env.TOKEN_KEY, options, (err, decoded) => {
        if (err) throw new Error(err);
        if (decoded.type != type) throw new Error("Invalid token type");
        resolve(decoded);
      });
    });
  };

  const hashPassoword = (password) =>
    crypto.createHmac("SHA256", process.env.PRIVATE_KEY).update(password).digest("hex");

  return {
    generateToken,
    verifyToken,
    hashPassoword,
  };
};

export default Jwt;
