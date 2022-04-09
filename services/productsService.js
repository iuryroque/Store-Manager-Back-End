const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product;
};

const create = async (name, quantity) => {
  const { insertId } = await productsModel.create(name, quantity);

  const product = {
    name,
    quantity,
    id: insertId,
  };

  return product;
};

const edit = async (id, name, quantity) => {
  const product = await productsModel.edit(id, name, quantity);
  return product;
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
};
