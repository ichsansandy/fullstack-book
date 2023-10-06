const pool = require('../../database/postgres/pool');
const container = require('../../container');
const createServer = require('../createServer');
const BooksTableTestHelper = require('../../../../tests/BooksTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const RentTableTestHelper = require('../../../../tests/RentTableTestHelper');

describe('/books endpoint', () => {

  afterEach(async () => {
    await BooksTableTestHelper.cleanTable();
    await RentTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });
  
  afterAll(async () => {
    await pool.end();
  });

  describe('getAllAvailableBooks', () => {
    it('should show all book available correctly', async () => {
      // Arrange
      const server = await createServer(container);

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
  
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          name: 'Tester',
          password: 'password',
        },
      });

      const auth = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          name: 'Tester',
          password: 'password',
        },
      });

      const accessToken = JSON.parse(auth.payload).data.accessToken;

      // need to add postbook handler to make the test work

      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/books/available',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      //Assert
      const responseJson = JSON.parse(response.payload);
      console.log(responseJson);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.booksAvailable).toBeDefined();
      expect(responseJson.data.booksAvailable).toHaveLength(2);
    });
  });
});
