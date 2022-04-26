const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require("../../../models/salesModel");

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

describe('- MODEL TEST - Sales -', () => {

  describe('01 - Busca por todos as vendas', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([sales]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('- em caso de ter produtos registrados: retorna um array', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
    });

    it('- em caso de ter produtos registrados: retorna um array de objetos com as chaves "sale_id", "date", "product_id" e "quantity"', async () => {
      const [result] = await salesModel.getAll();
      expect(result).to.have.all.keys('saleId', 'date', 'productId', 'quantity');
    });

  });

  describe('02 - Busca venda por ID', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([sales]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('- em caso de ter vendas com ID buscado: retorna um array', async () => {
      const result = await salesModel.getById(1);
      expect(result).to.be.an('array');
    });
  })
})
