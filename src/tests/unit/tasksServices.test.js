const { describe } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect } = require('chai');
const tasksModel = require('../../handleTasks/Tasks.model');
const tasksService = require('../../handleTasks/Tasks.services');

chai.use(chaiAsPromised);

describe('src/handleTasks/Tasks.service', () => {
  beforeEach(sinon.restore);
  describe('getAll', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksModel, 'getAllModel').rejects();
      expect(tasksService.getAllService()).to.eventually.be.rejected;
    })
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksModel, 'getAllModel').resolves([]);
      expect(tasksService.getAllService()).to.eventually.deep.equal([]);
    })
  });
  describe('getById', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksModel, 'getByIdModel').rejects();
      expect(tasksService.getByIdService()).to.eventually.be.rejected;
    })
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksModel, 'getByIdModel').resolves({});
      expect(tasksService.getByIdService(1)).to.eventually.deep.equal({});
    })
    it('falha quando o service não encontra o registro', () => {
      sinon.stub(tasksModel, 'getByIdModel').resolves(null);
      expect(tasksService.getByIdService(1)).to.eventually.be.rejected;
    })
  });
  describe('createOne', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksModel, 'createOneModel').rejects();
      expect(tasksService.createOneService()).to.eventually.be.rejected;
    })
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksModel, 'createOneModel').resolves({});
      expect(tasksService.createOneService()).to.eventually.deep.equal({});
    })
  });
  describe('deleteById', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksModel, 'deleteByIdModel').rejects();
      expect(tasksService.deleteByIdService()).to.eventually.be.rejected;
    })
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksModel, 'deleteByIdModel').resolves({});
      expect(tasksService.deleteByIdService()).to.eventually.deep.equal({});
    })
    it('falha quando o service não encontra o registro', () => {
      sinon.stub(tasksModel, 'deleteByIdModel').resolves(null);
      expect(tasksService.deleteByIdService()).to.eventually.be.rejected;
    })
  });
  describe('updateStatusById', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksModel, 'updateStatusByIdModel').rejects();
      expect(tasksService.updateStatusByIdService()).to.eventually.be.rejected;
    })
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksModel, 'updateStatusByIdModel').resolves({});
      expect(tasksService.updateStatusByIdService()).to.eventually.deep.equal({});
    })
    it('falha quando o service não encontra o registro', () => {
      sinon.stub(tasksModel, 'updateStatusByIdModel').resolves(null);
      expect(tasksService.updateStatusByIdService()).to.eventually.be.rejected;
    })
  })
  describe('updateById', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksModel, 'updateByIdModel').rejects();
      expect(tasksService.updateByIdService()).to.eventually.be.rejected;
    })
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksModel, 'updateByIdModel').resolves({});
      expect(tasksService.updateByIdService()).to.eventually.deep.equal({});
    })
    it('falha quando o service não encontra o registro', () => {
      sinon.stub(tasksModel, 'updateByIdModel').resolves(null);
      expect(tasksService.updateByIdService()).to.eventually.be.rejected;
    })
  })
});