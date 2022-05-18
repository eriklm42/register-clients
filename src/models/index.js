import * as Clients from "./clients.js";
import * as Address from "./address.js";

export const models = {
  [Clients.name]: Clients.default,
  [Address.name]: Address.default,
};

export const registerModels = (conn) => {
  Object.values(models).forEach((registerF) => registerF(conn));
};
