const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

const sales = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

describe('- SERVICE TEST - Sales -', () => {

  before(() => {
    sinon.stub(salesModel, 'getById').resolves(sales)
    sinon.stub(salesModel, 'getAll').resolves(sales)
  })

  after(()=> {
    salesModel.getById.restore()
    salesModel.getAll.restore()
  })

  describe('01 - Busca venda pelo id', () => {

    describe('quando há um venda com o id passado', () => {

      it('- retorna um array com as informaçẽos do venda', async () => {
        const sale = await salesService.getById(1);
        expect(sale).to.be.an('array');
      });

      it('- retorna um array de objetos com as informaçẽos do venda', async () => {
        const sale = await salesService.getById(1);
        expect(sale).to.be.deep.equal(sales);
      });
    });
  });

  describe('02 - Busca todas as vendas', () => {

    describe('quando há um venda', () => {

      it('- retorna um array com as informaçẽos do venda', async () => {
        const sale = await salesService.getAll();
        expect(sale).to.be.an('array');
      });

      it('- retorna um array de objetos com as informaçẽos do venda', async () => {
        const sale = await salesService.getAll();
        expect(sale).to.be.deep.equal(sales);
      });
    });
  });
})

