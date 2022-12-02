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

describe('HTTP POST route /tasks', () => {
  const correctName = 'Correct name';
  const correctDescription = 'Correct description';

  before(async () => {
    sinon.stub(Tasks, 'create').returns(await mocks.create(correctName, correctDescription));
  });

  after(() => {
    sinon.restore();
  });

  describe('test the return with the mock of create', () => {
    let chaiResponse;
    before(async () => {
      chaiResponse = await chai
        .request(App)
        .post('/tasks')
        .send({ name: correctName, description: correctDescription });
    });

    it('should return a status of 201', () => {
      expect(chaiResponse).to.have.status(201);
    });

    it('should return an object', () => {
      const { body } = chaiResponse;
      expect(body).to.be.an('object');
      expect(body).to.have.property('success');
      expect(body).to.have.property('code');
      expect(body).to.have.property('response');
    });
  });
});
