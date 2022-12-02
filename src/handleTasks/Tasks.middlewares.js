const { StatusCodes: { BAD_REQUEST } } = require('http-status-codes');

const idParamsExists = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(BAD_REQUEST).json({ message: 'id is required' });
  }
  return next();
};

const idParamsIsValid = async (req, res, next) => {
  const { id } = req.params;
  const idNumber = Number(id);
  if (Number.isNaN(idNumber)) {
    return res.status(BAD_REQUEST).json({ message: 'id must be a number' });
  }
  if (Number.isInteger(idNumber) === false) {
    return res.status(BAD_REQUEST).json({ message: 'id must be an integer' });
  }
  if (idNumber <= 0) {
    return res.status(BAD_REQUEST).json({ message: 'id must be positive' });
  }
  return next();
};

const statusParamsValidation = async (req, res, next) => {
  const { status } = req.params;
  if (!status) {
    return res.status(BAD_REQUEST).json({ message: 'status is required' });
  }
  const isStatusNumber = Number(status);
  if (!Number.isNaN(isStatusNumber)) {
    return res.status(BAD_REQUEST).json({ message: 'status must be a string' });
  }
  if (!['pending', 'ongoing', 'finished'].includes(status)) {
    return res.status(BAD_REQUEST).json({ message: 'invalid status' });
  }
  return next();
};

const nameDescriptionBodyValidation = async (req, res, next) => {
  const { name, description } = req.body;
  if (!name && !description) {
    return res.status(BAD_REQUEST).json({ message: 'name and description are required' });
  }
  return next();
};

const nameBodyValidation = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(BAD_REQUEST).json({ message: 'name is required' });
  }
  return next();
};

const descriptionBodyValidation = async (req, res, next) => {
  const { description } = req.body;
  if (!description) {
    return res.status(BAD_REQUEST).json({ message: 'description is required' });
  }
  return next();
};

const queryFilterIsValid = async (req, res, next) => {
  const { filter } = req.query;
  if (filter && !['name', 'description', 'status', 'createdAt', 'updatedAt'].includes(filter)) {
    return res.status(BAD_REQUEST).json({ message: 'invalid filter' });
  }
  return next();
};

const queryOrderIsValid = async (req, res, next) => {
  const { order } = req.query;
  if (order && !['asc', 'desc'].includes(order)) {
    return res.status(BAD_REQUEST).json({ message: 'invalid order' });
  }
  return next();
};

module.exports = {
  idParamsExists,
  idParamsIsValid,
  statusParamsValidation,
  nameDescriptionBodyValidation,
  nameBodyValidation,
  descriptionBodyValidation,
  queryFilterIsValid,
  queryOrderIsValid,
};
