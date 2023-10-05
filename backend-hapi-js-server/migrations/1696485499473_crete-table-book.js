/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('books', {
    code: {
      type: 'VARCHAR(20)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    author: {
      type: 'TEXT',
      notNull: true,
    },
    stock: {
      type: 'INTEGER',
      notNull: true,
      check: 'stock >= 0',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('books');
};