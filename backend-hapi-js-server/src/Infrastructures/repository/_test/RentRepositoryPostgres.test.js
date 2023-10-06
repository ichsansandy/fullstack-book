const pool = require('../../database/postgres/pool');
const RentTableTestHelper = require('../../../../tests/RentTableTestHelper');
const BooksTableTestHelper = require('../../../../tests/BooksTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const RentRepositoryPostgres = require('../RentRepositoryPostgres');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const { DatabaseError } = require('pg');

describe('RentRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({
      code: 'M001',
      name: 'Tester',
    });

    await BooksTableTestHelper.addBooks([
      {
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 1,
      },
      {
        code: 'SHR-1',
        title: 'A Study in Scarlet',
        author: 'Arthur Conan Doyle',
        stock: 1,
      },
      {
        code: 'TW-11',
        title: 'Twilight',
        author: 'Stephenie Meyer',
        stock: 1,
      },
    ]);
  });

  afterEach(async () => {
    await RentTableTestHelper.cleanTable();
    await BooksTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('createRent', () => {
    it('should throw InvariantError when book code not correct', async () => {
      // Arrange
      const rentRepositoryPostgres = new RentRepositoryPostgres(pool);

      // Action & Assert
      await expect(rentRepositoryPostgres.createRent('M001', 'WRONG_BOOK')).rejects.toThrowError(DatabaseError);
    });

    it('should rent a book properly', async () => {
      // Arrange
      const rentRepositoryPostgres = new RentRepositoryPostgres(pool);

      // Action
      await rentRepositoryPostgres.createRent('M001', 'JK-45');

      // Assert
      const rentedBook = await RentTableTestHelper.getRent('M001', 'JK-45');

      expect(rentedBook.member_code).toEqual('M001');
      expect(rentedBook.book_code).toEqual('JK-45');
    });
  });

  describe('deleteRent', () => {
    it('should throw InvariantError when book code not correct', async () => {
      // Arrange
      const rentRepositoryPostgres = new RentRepositoryPostgres(pool);

      // Action & Assert
      await expect(rentRepositoryPostgres.deleteRent('M001', 'WRONG_BOOK')).rejects.toThrowError(InvariantError);
    });

    it('should rent a book properly', async () => {
      // Arrange
      await RentTableTestHelper.addRent('M001', 'JK-45');
      const rentRepositoryPostgres = new RentRepositoryPostgres(pool);

      // Action
      await rentRepositoryPostgres.deleteRent('M001', 'JK-45');

      // Assert
      const rentedBook = await RentTableTestHelper.getRent('M001', 'JK-45');

      expect(rentedBook).toBeUndefined();
    });
  });
});
