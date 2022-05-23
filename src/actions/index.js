const Actions = () => {
  const search = async (model, where, populateOptions, onlyOne = false) => {
    const query = model.find(where);
    if (populateOptions) query.populate(populateOptions);
    const response = await query.exec();
    return onlyOne ? response[0] : response;
  };

  const create = async (model, data) => {
    await model.customValidate({ ...data, action: "create" });

    return await new model(data).save();
  };

  const findOne = async (model, where, populateOptions) => {
    return await search(model, where, populateOptions, true);
  };

  const find = async (model, where, populateOptions) => {
    return await search(model, where, populateOptions);
  };

  const remove = async (model, where) => {
    await model.deleteOne(where);
  };

  const update = async (model, where, data) => {
    model.customValidate({ ...where, ...data, action: "update" });

    await model.findOneAndUpdate(where, data, {
      new: true,
    });
  };

  return {
    create,
    find,
    findOne,
    remove,
    update,
  };
};

export default Actions;
