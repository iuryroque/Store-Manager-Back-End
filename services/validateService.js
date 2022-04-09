const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

 const checkProductExists = async (name) => {
  // Verifica se tem o nome no banco
  const productExists = await productsModel.getByName(name);
  return productExists;
 };

 const checkIdNotExists = async (id, urlSale) => {
  // Verifica se tem o id no banco
  // Se for url de vendas passa para o model de vendas se não passa para o de produtos
  const idNotExists = urlSale ? await salesModel.getById(id) : await productsModel.getById(id);
  return idNotExists;
 };

module.exports = {
  checkProductExists,
  checkIdNotExists,
};
