const salesService = require('../services/salesService');

const getAll = async (req, res, next) => {
  try {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sale = await salesService.getById(id);

    if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const saleList = req.body;
    const resSaleList = await salesService.create(saleList);
    return res.status(201).json(resSaleList);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    return res.status(201).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
};
