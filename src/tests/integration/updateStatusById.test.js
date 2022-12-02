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

describe('HTTP PUT route /tasks/:id/:status', () => {
  const id = '2';
  const status = 'ongoing';
  before(async () => {
    sinon.stub(Tasks, 'findByPk').returns(mocks.findByPk(id));
    sinon.stub(Tasks, 'update').returns(await mocks.updateStatusById(id, status));
  });

  after(() => {
    Tasks.update.restore();
    Tasks.findByPk.restore();
  });

  describe('test the return with the mock of update', () => {
    let response;
    before(async () => {
      response = await chai
        .request(App)
        .put(`/tasks/${id}/${status}`);
    });

    it('should return a status of 200', () => {
      expect(response).to.have.status(200);
    });

    it('should return an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('should return an object with this properties', () => {
      expect(response.body).to.have.property('message').equal(`task ${id} updated to status ${status}`);
    });
  });
});
