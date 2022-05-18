const Actions = () => {
  const create = async (model, data) => {
    await model.customValidate({ ...data, action: "create" });

    return await new model(data).save();
  };

  const find = async (model, where, populateOptions, sort = {}, limit = 1) => {
    const query = model.find(where).sort(sort).limit(limit);
    if (populateOptions) query.populate(populateOptions);
    const response = await query.exec();
    console.log({ response });
    return response;
  };

  const remove = async (model, where) => {
    await model.findOneAndUpdate(
      where,
      { active: false },
      {
        new: true,
      }
    );
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
    remove,
    update,
  };
};

export default Actions;
