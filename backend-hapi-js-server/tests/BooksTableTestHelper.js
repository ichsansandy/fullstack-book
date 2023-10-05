/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const BooksTableTestHelper = {
  async addBooks(books) {
    const values = [];
    let placeholder = [];
    for (let i = 0; i < books.length; i++) {
      const { code, title, author, stock } = books[i];
      values.push(code, title, author, stock);
      placeholder.push(`($${values.length - 3}, $${values.length - 2}, $${values.length - 1}, $${values.length})`);
    }

    const queryText = `INSERT INTO books (code, title, author, stock) VALUES ${placeholder.join(', ')}`;
    await pool.query(queryText, values);
  },

  async setStockToZero(bookCode) {
    const query = {
      text: 'UPDATE books SET stock = 0 WHERE code = $1',
      values: [bookCode],
    };
    await pool.query(query);
  },

  async getBookByCode(bookCode) {
    const query = {
      text: 'SELECT * FROM books WHERE code = $1',
      values: [bookCode],
    };

    const result = await pool.query(query);

    return result.rows[0];
  },

  async cleanTable() {
    await pool.query('DELETE FROM books WHERE 1=1');
  },
};

module.exports = BooksTableTestHelper;
