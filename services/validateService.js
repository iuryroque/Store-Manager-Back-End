const productsModel = require('../models/productsModel');

 const checkProductExists = async (name) => {
  // Verifica se tem o nome no banco
  const nameDuplicate = await productsModel.getByName(name);
  return nameDuplicate;
 };

module.exports = {
  checkProductExists,
};
