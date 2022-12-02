const { describe } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect } = require('chai');
const { Tasks } = require('../../database/models');
const tasksModel = require('../../handleTasks/Tasks.model');

chai.use(chaiAsPromised);

describe('src/handleTasks/Tasks.model', () => {
  beforeEach(sinon.restore);
  describe('getAll', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(Tasks, 'findAll').rejects();
      expect(tasksModel.getAllModel()).to.eventually.be.rejected;
    });
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(Tasks, 'findAll').resolves([]);
      expect(tasksModel.getAllModel()).to.eventually.deep.equal([]);
    });
  });
  describe('getById', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(Tasks, 'findByPk').rejects();
      expect(tasksModel.getByIdModel()).to.eventually.be.rejected;
    });
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(Tasks, 'findByPk').resolves({});
      expect(tasksModel.getByIdModel(1)).to.eventually.deep.equal({});
    });
    it('falha quando o service não encontra o registro', () => {
      sinon.stub(Tasks, 'findByPk').resolves(null);
      expect(tasksModel.getByIdModel(1)).to.eventually.be.rejected;
    });
  });
  describe('create', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(Tasks, 'create').rejects();
      expect(tasksModel.createOneModel()).to.eventually.be.rejected;
    });
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(Tasks, 'create').resolves({});
      expect(tasksModel.createOneModel()).to.eventually.deep.equal({});
    });
  });
  describe('deleteById', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(Tasks, 'destroy').rejects();
      expect(tasksModel.deleteByIdModel()).to.eventually.be.rejected;
    });
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(Tasks, 'destroy').resolves(null);
      expect(tasksModel.deleteByIdModel(1)).to.eventually.deep.equal(null);
    });
    it('falha quando o service não encontra o registro', () => {
      sinon.stub(Tasks, 'destroy').resolves(null);
      expect(tasksModel.deleteByIdModel(1)).to.eventually.be.rejected;
    });
  });
  describe('updateStatusById', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(Tasks, 'update').rejects();
      expect(tasksModel.updateStatusByIdModel()).to.eventually.be.rejected;
    });
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(Tasks, 'update').resolves({});
      expect(tasksModel.updateStatusByIdModel(1)).to.eventually.deep.equal({});
    });
  });
  describe('updateById', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(Tasks, 'update').rejects();
      expect(tasksModel.updateByIdModel()).to.eventually.be.rejected;
    });
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(Tasks, 'update').resolves({});
      expect(tasksModel.updateByIdModel(1)).to.eventually.deep.equal({});
    });
  });
});
