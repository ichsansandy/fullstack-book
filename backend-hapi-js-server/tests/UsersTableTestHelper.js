/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const UsersTableTestHelper = {
  async addUser({
    code = 'M001', name = 'dicoding', password = 'secret',
  }) {
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3)',
      values: [code, name, password],
    };

    await pool.query(query);
  },

  async findUsersById(code) {
    const query = {
      text: 'SELECT * FROM users WHERE code = $1',
      values: [code],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM users WHERE 1=1');
  },
};

module.exports = UsersTableTestHelper;
