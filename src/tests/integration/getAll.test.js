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

describe('HTTP GET route /tasks', () => {
  before(async () => { sinon.stub(Tasks, 'findAll').returns(mocks.findAll()); });

  after(() => { sinon.restore(); });

  describe('test the return with the mock of findAll', () => {
    let chaiResponse;
    before(async () => {
      chaiResponse = await chai
        .request(App)
        .get('/tasks');
    });

    it('should return a status of 200', () => {
      expect(chaiResponse).to.have.status(200);
    });

    it('should return an object with this properties', () => {
      const { body } = chaiResponse;
      expect(body).to.be.an('object');
      expect(body).to.have.property('success');
      expect(body).to.have.property('code');
      expect(body).to.have.property('response');
    });

    it('response property return an array with a lengthOf 3', () => {
      const { body: { response } } = chaiResponse;
      expect(response.response).to.have.lengthOf(3);
    });

    it('should return an array of objects', () => {
      const { body: { response } } = chaiResponse;
      expect(response.response).to.be.an('array');
      expect(response.response[0]).to.be.an('object');
      expect(response.response[1]).to.be.an('object');
      expect(response.response[2]).to.be.an('object');
    });

    it('should return an array of objects with this properties', () => {
      const { body: { response } } = chaiResponse;
      expect(response.response[0]).to.have.all.keys(
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
