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

const edit = async (id, name, quantity) => {
  const [product] = await
  connection.execute('UPDATE products SET name = ?, quantity = ? WHERE products.id  = ?',
   [name, quantity, id]);
  return product;
};

const destroy = async (id) => {
  const [product] = await connection.execute('DELETE FROM products WHERE products.id = ?', [id]);
  return product;
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  edit,
  destroy,
};
