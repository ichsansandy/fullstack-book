const InvariantError = require('../../Commons/exceptions/InvariantError');
const RentReposiotry = require('../../Domains/rents/RentRepository');

class RentRepositoryPostgres extends RentReposiotry {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async createRent(userCode, bookCode) {
    const date = new Date();

    const query = {
      text: 'INSERT INTO rent (member_code, book_code, rented_at) VALUES ($1, $2, $3)',
      values: [userCode, bookCode, date],
    };

    await this._pool.query(query);
  }

  async deleteRent(userCode, bookCode) {
    const query = {
      text: 'DELETE FROM rent WHERE member_code = $1 AND book_code = $2',
      values: [userCode, bookCode],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('member cannot return the book');
    }
  }
}

module.exports = RentRepositoryPostgres;
