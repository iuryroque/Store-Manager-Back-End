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

module.exports = {
  getAll,
  getById,
};
