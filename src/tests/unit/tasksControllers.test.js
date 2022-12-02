const { describe } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect } = require('chai');
const tasksService = require('../../handleTasks/Tasks.services');
const tasksController = require('../../handleTasks/Tasks.controllers');
const middlewares = require('../../handleTasks/Tasks.middlewares');

chai.use(chaiAsPromised);

describe('src/handletask/Tasks.controllers', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('getAll', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksService, 'getAllService').rejects();
      expect(tasksController.getAllController()).to.eventually.be.rejected;
    })
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksService, 'getAllService').resolves([]);
      expect(tasksController.getAllController()).to.eventually.deep.equal([]);
    })
  })
  describe('getById', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksService, 'getByIdService').rejects();
      expect(tasksController.getByIdController()).to.eventually.be.rejected;
    })
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksService, 'getByIdService').resolves({});
      expect(tasksController.getByIdController(1)).to.eventually.deep.equal({});
    })
    it('falha quando o service não encontra o registro', () => {
      sinon.stub(tasksService, 'getByIdService').resolves(null);
      expect(tasksController.getByIdController(1)).to.eventually.be.rejected;
    })
    it('falha quando a param id não é um número', () => {
      expect(tasksController.getByIdController('notANumberForSure')).to.eventually.be.rejected;
    })
    it('falha quando a param id é um número negativo', () => {
      expect(tasksController.getByIdController(-1)).to.eventually.be.rejected;
    })
    it('falha quando a param id é um número decimal', () => {
      expect(tasksController.getByIdController(1.1)).to.eventually.be.rejected;
    })
  })
  describe('create', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksService, 'createOneService').rejects();
      expect(tasksController.createOneController()).to.eventually.be.rejected;
    })
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksService, 'createOneService').resolves({});
      expect(tasksController.createOneController({})).to.eventually.deep.equal({});
    })
    it('falha quando o body não é um objeto', () => {
      expect(tasksController.createOneController('')).to.eventually.be.rejected;
    })
    it('falha quando o body não tem o campo name', () => {
      expect(tasksController.createOneController({})).to.eventually.be.rejected;
    })
    it('falha quando o body não tem o campo description', () => {
      expect(tasksController.createOneController({ name: 'name' })).to.eventually.be.rejected;
    })
  })
});
