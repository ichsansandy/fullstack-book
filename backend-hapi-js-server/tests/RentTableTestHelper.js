/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const RentTableTestHelper = {
  async addRent( memberCode = 'M001', bookCode = 'JK-45' ) {
    const date = new Date();

    const query = {
      text: 'INSERT INTO rent (member_code, book_code, rented_at) VALUES ( $1, $2, $3)',
      values: [memberCode, bookCode, date],
    };

    await pool.query(query);
  },

  async getRent(memberCode, bookCode) {
    const query = {
      text: 'SELECT * FROM rent WHERE member_code = $1 AND book_code = $2',
      values: [memberCode, bookCode],
    };

    const result = await pool.query(query);

    return result.rows[0];
  },

  async cleanTable() {
    await pool.query('DELETE FROM rent WHERE 1=1');
  },
};

module.exports = RentTableTestHelper;
