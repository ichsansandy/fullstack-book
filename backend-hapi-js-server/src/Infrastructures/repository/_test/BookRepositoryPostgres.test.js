const BookRepositoryPostgres = require('../BookRepositoryPostgres');
const pool = require('../../database/postgres/pool');
const BooksTableTestHelper = require('../../../../tests/BooksTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');

describe('BookRepositoryPostgres', () => {
  beforeEach(async () => {
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
        stock: 0,
      },
    ]);
  });

  afterEach(async () => {
    await BooksTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('getAllAvailableBooks', () => {
    it('should show all book with stock more than 1 correctly', async () => {
      // Arrange
      const bookRepositoryPostgres = new BookRepositoryPostgres(pool);

      // Action
      const books = await bookRepositoryPostgres.getAllAvailableBooks();

      // Assert
      expect(books).toHaveLength(2);
    });
  });

  describe('updateBookStock', () => {
    it('should throw InvariantError when book code not correct', async () => {
      // Arrange
      const bookRepositoryPostgres = new BookRepositoryPostgres(pool);

      // Action & Assert
      await expect(bookRepositoryPostgres.updateBookStock('NOT-1', 'rent')).rejects.toThrowError(InvariantError);
    });

    it('should throw InvariantError when action is illegal', async () => {
      // Arrange
      const bookRepositoryPostgres = new BookRepositoryPostgres(pool);

      // Action & Assert
      await expect(bookRepositoryPostgres.updateBookStock('SHR-1', 'destroy')).rejects.toThrowError(InvariantError);
    });

    it('should reduce the stock by 1 if its rent', async () => {
      // Arrange
      const bookRepositoryPostgres = new BookRepositoryPostgres(pool);

      // Action 
      await bookRepositoryPostgres.updateBookStock('SHR-1', 'rent');

      // Assert
      const rentedBook = await BooksTableTestHelper.getBookByCode('SHR-1')
      
      expect(rentedBook.stock).toEqual(0)
    });

    it('should increase the stock by 1 if its return', async () => {
      // Arrange
      const bookRepositoryPostgres = new BookRepositoryPostgres(pool);

      // Action 
      await bookRepositoryPostgres.updateBookStock('TW-11', 'return');

      // Assert
      const rentedBook = await BooksTableTestHelper.getBookByCode('TW-11')
      
      expect(rentedBook.stock).toEqual(1)
    });
  });
});
