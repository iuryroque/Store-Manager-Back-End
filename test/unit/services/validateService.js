const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');
const productsService = require('../../../services/productsService');
const { checkIdNotExists } = require('../../../services/validateService');
const { object } = require('joi');


const products = [
  { id: 1, name: 'Martelo de Thor', quantity: 10 },
  { id: 2, name: 'Traje de encolhimento', quantity: 20 },
  { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
];

describe('- SERVICE TEST - validate -', () => {

  before(() => {
    sinon.stub(salesModel, 'getById').resolves(products[1])
  })

  after(()=> {
    salesModel.getById.restore()
  })

  describe('01 - Busca venda pelo id valido', () => {


    describe('- em caso de ter vendas com ID buscado: retorna um objeto', () => {

      it('- retorna um objeto com as informaçẽos do produto', async () => {
        const product = await checkIdNotExists(products[1].id, true);
        expect(product).to.be.an('object');
      });
    });
  });
});
