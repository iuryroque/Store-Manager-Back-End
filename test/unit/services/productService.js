const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

const products = [
  { id: 1, name: 'Martelo de Thor', quantity: 10 },
  { id: 2, name: 'Traje de encolhimento', quantity: 20 },
  { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
];

describe('- SERVICE TEST - Products -', () => {

  before(() => {
    sinon.stub(productsModel, 'getById').resolves(products)
    sinon.stub(productsModel, 'getAll').resolves(products)
  })

  after(()=> {
    productsModel.getById.restore()
    productsModel.getAll.restore()
  })

  describe('01 - Busca produto pelo id', () => {


    describe('- em caso de ter produtos com ID buscado: retorna um array', () => {

      it('- retorna um array com as informaçẽos do produto', async () => {
        const product = await productsService.getById(1);
        expect(product).to.be.an('array');
      });

      it('- retorna um objeto com as informaçẽos do produto', async () => {
        const product = await productsService.getById(1);
        expect(product).to.be.deep.equal(products);
      });
    });
  });

  describe('02 - Busca todos os produtos', () => {

    describe('quando há um produto', () => {

      it('- em caso de ter produtos registrados: retorna um array', async () => {
        const product = await productsService.getAll();
        expect(product).to.be.an('array');
      });

      it('- em caso de ter produtos registrados: retorna um array de objetos com as chaves "id", "name", e "quantity"', async () => {
        const product = await productsService.getAll();
        expect(product).to.be.deep.equal(products);
      });
    });
  });
})
