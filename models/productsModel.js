const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT id, name, quantity FROM products');
  return products;
};

const getById = async (id) => {
  const [[product]] = await
    connection.execute('SELECT id, name, quantity FROM products WHERE id = ?', [id]);
  return product;
};

const getByName = async (name) => {
  const [[product]] = await
    connection.execute('SELECT id, name, quantity FROM products WHERE name = ?', [name]);
  return product;
};

const create = async (name, quantity) => {
  const [product] = await
  connection.execute('INSERT INTO products (name, quantity) VALUES (?, ?)',
   [name, quantity]);
  return product;
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
};
