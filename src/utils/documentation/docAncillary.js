const idExistsValidationDoc = {
  params: {
    id: {
      type: 'integer', wherePass: 'params/URL', required: true, minLength: 1, shouldExistInDB: true,
    },
  },
};

const bodyValidationDoc = {
  body: {
    JSON: {
      name: {
        type: 'string', wherePass: 'body', required: true, minLength: 1,
      },
      description: {
        type: 'string', wherePass: 'body', required: true, minLength: 1,
      },
    },
  },
};

const validationStatusDoc = {
  params: {
    status: {
      type: 'integer', wherePass: 'params/URL', required: true, statusOptions: ['pending', 'ongoing', 'finished'],
    },
  },
};

module.exports = {
  idExistsValidationDoc,
  bodyValidationDoc,
  validationStatusDoc,
};
