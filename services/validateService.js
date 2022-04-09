const productsModel = require('../models/productsModel');

 const checkProductExists = async (name) => {
  // Verifica se tem o nome no banco
  const productExists = await productsModel.getByName(name);
  return productExists;
 };

 };

module.exports = {
  checkProductExists,
};
