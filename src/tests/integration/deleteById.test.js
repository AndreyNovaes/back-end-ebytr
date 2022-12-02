const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const {
  before,
  after,
  describe,
  it,
} = require('mocha');

const App = require('../../app');
const { Tasks } = require('../../database/models');
const mocks = require('../__mocks__');

chai.use(chaiHttp);

const { expect } = chai;

describe('HTTP delete route /tasks/:id', () => {
  const validId = '4';
  before(async () => {
    sinon.stub(Tasks, 'destroy').returns(await mocks.destroy(validId));
  });

  after(() => {
    Tasks.destroy.restore();
  });

  describe('test the return of the mock of delete', () => {
    let response;
    before(async () => {
      response = await chai
        .request(App)
        .delete('/tasks/4');
    });

    it('should return a status of 200', () => {
      expect(response).to.have.status(200);
    });

    it('should return an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('should return an object with this properties', () => {
      expect(response.body).to.have.property('message');
    });

    it('should return a message like this', () => {
      expect(response.body.message).to.equal(`task ${validId} deleted`);
    });
  });
});
