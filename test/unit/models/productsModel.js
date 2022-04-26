const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require("../../../models/productsModel");

const productMock = { id: 1, name: 'Martelo de Thor', quantity: 10 };
const productErrorMock = { id: 1000000, name: 'Mastelo de Thron', quantity: 10 };

const products = [
  { id: 1, name: 'Martelo de Thor', quantity: 10 },
  { id: 2, name: 'Traje de encolhimento', quantity: 20 },
  { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
];

describe('- MODEL TEST - Product -', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([products]);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('01 - Busca por todos os produtos', () => {

    it('- em caso de ter produtos registrados: retorna um array', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
    });

    it('- em caso de ter produtos registrados: retorna um array de objetos com as chaves "id", "name", e "quantity"', async () => {
      const [result] = await productsModel.getAll();
      expect(result).to.have.all.keys('id', 'name', 'quantity');
    });

  });

  describe('02 - Busca produto por ID', () => {

    it('- em caso de ter produtos com ID buscado: retorna um array', async () => {
      const result = await productsModel.getById(1);
      expect(result).to.be.an('object');
    });

    it('- em caso de ter produtos com o ID buscado: retorna array com as informações dos produtos', async () => {
      const result = await productsModel.getById();
      expect(result).to.be.deep.equal(productMock);
    });

  })

  describe('03 - Busca produto pelo nome', () => {

    it('- em caso de ter produtos com nome buscado: retorna um array', async () => {
      const result = await productsModel.getByName();
      expect(result).to.be.an('object');
    });

    it('- em caso de ter produtos com nome buscado: retorna um array de objetos com informações do produto"', async () => {
      const product = await productsModel.getByName();
      expect(product).to.be.deep.equal(productMock);
    });
  });

  describe('04 - Apaga um produto ', () => {

    describe('- em caso da exclusão dar certo: retorna um array', () => {
      it('- em caso da exclusão dar certo: retorna um array com as informações da exclusão', async () => {
        const result = await productsModel.destroy(productMock.id);
        expect(result).to.be.an('array');
      });
    });
  });

})
