const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const {
  before, after, describe, it,
} = require('mocha');
const App = require('../../app');
const { Tasks } = require('../../database/models');
const mocks = require('../__mocks__');

chai.use(chaiHttp);

const { expect } = chai;

describe('HTTP GET route /tasks/:id', () => {
  const id = '1';
  before(async () => { sinon.stub(Tasks, 'findByPk').returns(mocks.findByPk(id)); });

  after(() => { sinon.restore(); });

  describe('test the return with the mock of findOne', () => {
    let chaiResponse;
    before(async () => {
      chaiResponse = await chai
        .request(App)
        .get(`/tasks/${id}`);
    });

    it('should return a status of 200', () => {
      expect(chaiResponse).to.have.status(200);
    });

    it('should return an object', () => {
      const { body } = chaiResponse;
      expect(body).to.be.an('object');
      expect(body).to.have.property('success');
      expect(body).to.have.property('code');
      expect(body).to.have.property('response');
    });

    it('should return an object with this properties', () => {
      const { body } = chaiResponse;
      expect(body.response.response).to.have.all.keys(
        'id',
        'name',
        'description',
        'status',
        'createdAt',
        'updatedAt',
      );
    });
  });
});
