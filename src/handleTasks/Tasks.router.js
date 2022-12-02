const { Router } = require('express');
const tasksController = require('./Tasks.controllers');
const {
  idParamsExists,
  idParamsIsValid,
  statusParamsValidation,
  nameDescriptionBodyValidation,
  nameBodyValidation,
  descriptionBodyValidation,
  queryFilterIsValid,
  queryOrderIsValid,
} = require('./Tasks.middlewares');

const router = Router();

router
  .get(
    '/',
    queryFilterIsValid,
    queryOrderIsValid,
    tasksController.getAllController,
  )
  .get(
    '/:id',
    idParamsIsValid,
    tasksController.getByIdController,
  )
  .post(
    '/',
    nameDescriptionBodyValidation,
    nameBodyValidation,
    descriptionBodyValidation,
    tasksController.createOneController,
  )
  .delete(
    '/:id',
    idParamsExists,
    idParamsIsValid,
    tasksController.deleteByIdController,
  )
  .put(
    '/:id/:status',
    idParamsExists,
    idParamsIsValid,
    statusParamsValidation,
    tasksController.updateStatusByIdController,
  )
  .put(
    '/:id',
    idParamsExists,
    idParamsIsValid,
    nameDescriptionBodyValidation,
    nameBodyValidation,
    descriptionBodyValidation,
    tasksController.updateByIdController,
  );

module.exports = router;
