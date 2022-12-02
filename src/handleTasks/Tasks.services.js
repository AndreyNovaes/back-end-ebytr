const {
  getAllModel,
  getByIdModel,
  createOneModel,
  deleteByIdModel,
  updateStatusByIdModel,
  updateByIdModel,
} = require('./Tasks.model');

const getAllService = async (query) => {
  const tasks = await getAllModel(query);
  return tasks;
};

const getByIdService = async (id) => {
  // a validação se o id existe é feita na service => controller
  const task = await getByIdModel(id);
  if (!task) { return null; }
  return task;
};

const createOneService = async (name, description) => {
  // a validação de, se o nome e a descrição são válidos está na middleware => router
  const baseStatus = 'pending';
  const newTaskCreated = await createOneModel(name, description, baseStatus);
  return {
    id: newTaskCreated.insertId,
    ...newTaskCreated.dataValues,
  };
};

const deleteByIdService = async (id) => {
  // a validação se o id existe é feita na service => controller
  const task = await deleteByIdModel(id);
  if (!task) { return null; }
  return task;
};

const updateStatusByIdService = async (id, status) => {
  // a validação de, se o id existe e, se o status é válido está na middleware => router
  const task = await updateStatusByIdModel(id, status);
  if (!task) { return null; }
  return task;
};

const updateByIdService = async (id, name, description) => {
  // a validação de, se o id existe e, se o nome e a descrição são válidos está na middlew => router
  const task = await updateByIdModel(id, name, description);
  return task;
};

module.exports = {
  getAllService,
  getByIdService,
  createOneService,
  deleteByIdService,
  updateStatusByIdService,
  updateByIdService,
};
