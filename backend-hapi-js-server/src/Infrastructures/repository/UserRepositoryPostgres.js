const InvariantError = require('../../Commons/exceptions/InvariantError');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../Domains/users/UserRepository');

class UserRepositoryPostgres extends UserRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async verifyAvailableUsername(username) {
    const query = {
      text: 'SELECT name FROM users WHERE name = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('name tidak tersedia');
    }
  }

  async getTotalUsers() {
    const result = await this._pool.query('SELECT COUNT(*) as total FROM users');

    return result.rows[0].total;
  }

  async addUser(registerUser) {
    const { name, password } = registerUser;
    const number = await this.getTotalUsers();
    const newNumber = Number(number) + 1;
    const code = ('000' + newNumber).slice(-3);
    const id = `M${code}`;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3) RETURNING code, name',
      values: [id, name, password],
    };

    const result = await this._pool.query(query);

    return new RegisteredUser({ ...result.rows[0] });
  }

  async getPasswordByUsername(username) {
    const query = {
      text: 'SELECT password FROM users WHERE name = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('name tidak ditemukan');
    }

    return result.rows[0].password;
  }

  async getIdByUsername(username) {
    const query = {
      text: 'SELECT code FROM users WHERE name = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('user tidak ditemukan');
    }

    const { code } = result.rows[0];

    return code;
  }
}

module.exports = UserRepositoryPostgres;
