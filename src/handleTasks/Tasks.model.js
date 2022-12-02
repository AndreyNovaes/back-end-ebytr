const { Tasks } = require('../database/models');

const getAllModel = async (query) => {
  // filter can be name(alphabetically), status(by status), or createdAt(by creation date)
  // order can be asc(ascending) or desc(descending)
  if (query.filter && query.order) {
    const { filter, order } = query;
    return Tasks.findAll({
      order: [[filter, order]],
    });
  }
  if (query.filter) {
    const { filter } = query;
    return Tasks.findAll({
      order: [[filter, 'asc']],
    });
  }
  return Tasks.findAll();
};

const getByIdModel = async (id) => {
  const task = await Tasks.findByPk(id);
  return task;
};

const createOneModel = async (name, description, status) => {
  const task = await Tasks.create({ name, description, status });
  return task;
};

const deleteByIdModel = async (id) => {
  const task = await Tasks.destroy({ where: { id } });
  return task;
};

const updateStatusByIdModel = async (id, status) => {
  const task = await Tasks.update({ status }, { where: { id } });
  return task;
};

const updateByIdModel = async (id, name, description) => {
  const task = await Tasks.update({ name, description }, { where: { id } });
  return task;
};

module.exports = {
  getAllModel,
  getByIdModel,
  createOneModel,
  deleteByIdModel,
  updateStatusByIdModel,
  updateByIdModel,
};
