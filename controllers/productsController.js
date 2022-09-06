const productsService = require('../services/productsService');

const getAll = async (req, res, next) => {
  try {
    const products = await productsService.getAll();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productsService.getById(id);
    if (product) return res.status(200).json(product);
    return res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    console.log(req);
    const { name, quantity } = req.body;
    const createProduct = await productsService.create(name, quantity);
    return res.status(201).json(createProduct);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    await productsService.edit(id, name, quantity);
    return res.status(200).json({ id, name, quantity });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productsService.destroy(id);
    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  destroy,
};
