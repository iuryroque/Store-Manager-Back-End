const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

describe('Verifica controller de produtos com a rota get', () => {
  const res = {};
  const req = {};
  const next = (e) => console.log(e);

  const productsMock = {
    "id": 1,
    "name": "Martelo de Thor",
    "quantity": 10
  };



  describe('getAll', () => {

    before(() => {

      sinon.stub(productsService, 'getAll').resolves(productsMock);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(()=>{
      productsService.getAll.restore();
    })

    it('rota volta status de 200 ao utilizar get', async() => {
      await productsController.getAll(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('getById', () => {
    describe('quando houver sucesso', () => {
      before(() => {
        req.params = 1;
        sinon.stub(productsService, 'getById').resolves(productsMock);

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(()=>{
        productsService.getById.restore();

        res.status.resetHistory()
        res.json.resetHistory()
      })

      it('Testa o Id', async() => {
        await productsController.getById(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      })

      it('Testa o Id', async() => {
        await productsController.getById(req, res, next);
        expect(req.params === 1).to.be.equal(true);
      })

    });

    describe('Quando não for encontrado id', () => {

      before(() => {
        req.params = 99;
        sinon.stub(productsService, 'getById').resolves();

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns({ message: 'Product not found' });
      });

      after(()=>{
        productsService.getById.restore();

        res.status.resetHistory()
        res.json.resetHistory()
      })

      it('Retorna 404', async() => {
        await productsController.getById(req, res, next);
        expect(res.status.calledWith(404)).to.be.equal(true);
      })

    })
  });
});
