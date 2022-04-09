const productsModel = require('../models/productsModel');

 const checkProductExists = async (name) => {
  // Verifica se tem o nome no banco
  const productExists = await productsModel.getByName(name);
  return productExists;
 };

 const checkIdNotExists = async (id) => {
  // Verifica se tem o id no banco
  const idNotExists = await productsModel.getById(id);
  return idNotExists;
 };

module.exports = {
  checkProductExists,
  checkIdNotExists,
};
