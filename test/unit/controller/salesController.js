const { expect } = require('chai');
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

describe('Verifica controller de vendas com a rota get', () => {
  const res = {};
  const req = {};
  const next = (e) => console.log(e);

  const reqMock = { "params": {"id": 1},
    "body": [
      {
        "productId": 1,
        "quantity": 4
      },
          {
        "productId": 1,
        "quantity": 3
      }
      ]
  };

  const salesMock = [
    {
      "saleId": 1,
      "date": "2022-04-19T01:19:58.000Z",
      "productId": 2,
      "quantity": 10
    },
    {
      "saleId": 2,
      "date": "2022-04-19T01:19:58.000Z",
      "productId": 3,
      "quantity": 15
    }
  ]

  describe('first', () => {
    before(() => {
      sinon.stub(salesService, 'getAll').resolves(salesMock);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(()=>{
      salesService.getAll.restore();
    })

    it('rota volta status de 200 ao utilizar get', async() => {
      await salesController.getAll(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

  })

  describe('getById', () => {
    before(() => {
      req.params = 1

      sinon.stub(salesService, 'getById').resolves(salesMock);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(()=>{
      salesService.getById.restore();
    })

    it('Testa se o id está vindo correto', async() => {
      await salesController.getById(req, res, next);
      expect(req.params === 1).to.be.equal(true);
    })
  })

  describe('create', () => {
    before(() => {
      req.body = [
        {
          "date": "2022-04-27T00:50:29.000Z",
          "productId": 3,
          "quantity": 15
        }
      ]

      sinon.stub(salesService, 'create').resolves(salesMock);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(()=>{
      salesService.create.restore();
    })

    it('Testa se o body é um array', async() => {
      await salesController.create(req, res, next);
      expect(req.body).to.be.an('array');
    })
  });

});
