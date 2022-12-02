const { idExistsValidationDoc, bodyValidationDoc, validationStatusDoc } = require('./docAncillary');

module.exports = {
  Documentation: {
    getAll: {
      route: '/tasks',
      method: 'get',
      queryParams: {
        filter: {
          type: 'string',
          wherepass: 'params/URL',
          example: '?filter={"status": "pending"}',
        },
        order: {
          type: 'string',
          wherepass: 'params/URL',
          example: '?order={"createdAt": "desc"}',
        },
      },
    },
    getById: { route: '/tasks/:id', method: 'get', validation: idExistsValidationDoc },
    createOne: { route: '/tasks', method: 'post', validation: bodyValidationDoc },
    deleteById: { route: '/tasks/:id', method: 'delete', validation: idExistsValidationDoc },
    updateById: {
      route: '/tasks/:id',
      method: 'put',
      validation: {
        params: idExistsValidationDoc.params,
        body: bodyValidationDoc.body,
      },
    },
    updateStatusById: {
      route: '/tasks/:id/:status',
      method: 'put',
      validation: {
        params: {
          ...idExistsValidationDoc.params,
          ...validationStatusDoc.params,
        },
      },
    },
  },
};
