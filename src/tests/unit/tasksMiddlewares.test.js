const { describe } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect } = require('chai');
const tasksMiddlewares = require('../../handleTasks/Tasks.middlewares');

chai.use(chaiAsPromised);

describe('src/handleTasks/Tasks.middlewares', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('validateId', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksMiddlewares, 'idParamsExists').rejects();
      expect(tasksMiddlewares.idParamsIsValid()).to.eventually.be.rejected;
    })
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksMiddlewares, 'idParamsExists').resolves();
      expect(tasksMiddlewares.idParamsIsValid()).to.eventually.be.fulfilled;
    })
    it('falha quando a param id não é um número', () => {
      expect(tasksMiddlewares.idParamsIsValid('notANumberForSure')).to.eventually.be.rejected;
    })
    it('falha quando a param id é um número negativo', () => {
      expect(tasksMiddlewares.idParamsIsValid(-1)).to.eventually.be.rejected;
    })
    it('falha quando a param id é um número decimal', () => {
      expect(tasksMiddlewares.idParamsIsValid(1.1)).to.eventually.be.rejected;
    })
  })
  describe('idParamsIsValid', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksMiddlewares, 'idParamsIsValid').rejects();
      expect(tasksMiddlewares.idParamsIsValid()).to.eventually.be.rejected;
    })
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksMiddlewares, 'idParamsIsValid').resolves();
      expect(tasksMiddlewares.idParamsIsValid()).to.eventually.be.fulfilled;
    })
  });
  describe('statusParamsValidation', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksMiddlewares, 'statusParamsValidation').rejects();
      expect(tasksMiddlewares.statusParamsValidation()).to.eventually.be.rejected;
    })
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksMiddlewares, 'statusParamsValidation').resolves();
      expect(tasksMiddlewares.statusParamsValidation()).to.eventually.be.fulfilled;
    })
  });
  describe('nameDescriptionBodyValidation', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksMiddlewares, 'nameDescriptionBodyValidation').rejects();
      expect(tasksMiddlewares.nameDescriptionBodyValidation()).to.eventually.be.rejected;
    })
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksMiddlewares, 'nameDescriptionBodyValidation').resolves();
      expect(tasksMiddlewares.nameDescriptionBodyValidation()).to.eventually.be.fulfilled;
    })
  });
  describe('nameBodyValidation', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksMiddlewares, 'nameBodyValidation').rejects();
      expect(tasksMiddlewares.nameBodyValidation()).to.eventually.be.rejected;
    }).timeout(5000)
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksMiddlewares, 'nameBodyValidation').resolves();
      expect(tasksMiddlewares.nameBodyValidation()).to.eventually.be.fulfilled;
    }).timeout(5000)
  });
  describe('descriptionBodyValidation', () => {
    it('falha quando acontece um erro inesperado', () => {
      sinon.stub(tasksMiddlewares, 'descriptionBodyValidation').rejects();
      expect(tasksMiddlewares.descriptionBodyValidation()).to.eventually.be.rejected;
    }).timeout(5000)
    it('sucesso quando o service retorna o resultado esperado', () => {
      sinon.stub(tasksMiddlewares, 'descriptionBodyValidation').resolves();
      expect(tasksMiddlewares.descriptionBodyValidation()).to.eventually.be.fulfilled;
    }).timeout(5000)
  });
});
