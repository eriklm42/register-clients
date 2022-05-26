const validationError = (error, res) => {
  console.error({ error });

  if (error.details) error.message = error.details[0].message;

  return res.status(400).send({ code: "VAL000", error: error.message });
};

export default validationError;
