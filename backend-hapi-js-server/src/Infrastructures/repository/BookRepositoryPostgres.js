const InvariantError = require('../../Commons/exceptions/InvariantError');
const BookRepository = require('../../Domains/books/BookRepository');

class BookRepositoryPostgres extends BookRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async getAllAvailableBooks() {
    const result = await this._pool.query('SELECT * FROM books WHERE stock > 0');

    return result.rows;
  }

  async updateBookStock(bookCode, action) {
    let query;

    if (action === 'rent') {
      query = {
        text: 'UPDATE books SET stock = stock - 1 WHERE code = $1 AND stock >= 0',
        values: [bookCode],
      };
    } else if (action === 'return') {
      query = {
        text: 'UPDATE books SET stock = stock + 1 WHERE code = $1 AND stock >= 0',
        values: [bookCode],
      };
    } else {
      throw new InvariantError('Illegal action');
    }

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('update stock book failed');
    }
  }
}

module.exports = BookRepositoryPostgres;
