const {
  StatusCodes: {
    OK, CREATED, NOT_FOUND,
  },
} = require('http-status-codes');
const {
  getAllService,
  getByIdService,
  createOneService,
  deleteByIdService,
  updateStatusByIdService,
  updateByIdService,
} = require('./Tasks.services');

const getAllController = async (req, res) => {
  const tasks = await getAllService(req.query);
  return res.status(OK).json({
    success: true,
    code: OK,
    response: tasks,
  });
};

const getByIdController = async (req, res) => {
  const { id } = req.params;
  const task = await getByIdService(id);
  if (!task) {
    return res.status(NOT_FOUND).json({
      success: false,
      code: NOT_FOUND,
      message: `Task with id ${id} not found`,
    });
  }
  return res.status(OK).json({ success: true, code: OK, response: task });
};

const createOneController = async (req, res) => {
  const { name, description } = req.body;
  const newTaskCreated = await createOneService(name, description);
  return res.status(CREATED).json({
    success: true,
    code: CREATED,
    response: newTaskCreated,
  });
};

const deleteByIdController = async (req, res) => {
  const { id } = req.params;
  const isTaskFindAndDeleted = await deleteByIdService(id);
  if (!isTaskFindAndDeleted) {
    return res.status(NOT_FOUND).json({ success: false, code: NOT_FOUND, message: 'task not found' });
  }
  return res.status(OK).json({ success: true, code: OK, message: `task ${id} deleted` });
};

const updateStatusByIdController = async (req, res) => {
  const status = req.url.split('/').pop();
  const { id } = req.params;
  const isUpdateSucessfully = await updateStatusByIdService(id, status);
  if (!isUpdateSucessfully) {
    return res.status(NOT_FOUND).json({
      success: false,
      code: NOT_FOUND,
      message: `Task with id ${id} not found`,
    });
  }
  return res.status(OK).json({
    success: true,
    code: OK,
    message: `task ${id} updated to status ${status}`,
  });
};

const updateByIdController = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const isUpdateSucessfully = await updateByIdService(id, name, description);
  if (!isUpdateSucessfully) {
    return res.status(NOT_FOUND).json({
      success: false,
      code: NOT_FOUND,
      message: `Task with id ${id} not found`,
    });
  }
  return res.status(OK).json({
    success: true,
    code: OK,
    message: `task ${id} updated`,
  });
};

module.exports = {
  getAllController,
  getByIdController,
  createOneController,
  deleteByIdController,
  updateStatusByIdController,
  updateByIdController,
};
