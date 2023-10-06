const InvariantError = require('../../Commons/exceptions/InvariantError');
const BookRepository = require('../../Domains/books/BookRepository');

class BookRepositoryPostgres extends BookRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async getAllAvailableBooks(memberCode) {
    const query = {
      text: 'SELECT * FROM books WHERE stock > 0 AND NOT EXISTS ( SELECT 1 FROM rent WHERE rent.member_code = $1 AND rent.book_code = books.code )',
      values: [memberCode],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getAllRentedBooks(memberCode) {
    const query = {
      text: ' SELECT books.* FROM books JOIN rent ON books.code = rent.book_code WHERE rent.member_code = $1',
      values: [memberCode],
    };

    const result = await this._pool.query(query);

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
