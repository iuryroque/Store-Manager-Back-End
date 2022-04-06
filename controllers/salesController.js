const salesService = require('../services/salesService');

const getAll = async (req, res, next) => {
  try {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};
