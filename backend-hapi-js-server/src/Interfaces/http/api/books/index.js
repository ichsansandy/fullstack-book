const BooksHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'books',
  register: async (server, { container }) => {
    const booksHandler = new BooksHandler(container);
    server.route(routes(booksHandler));
  },
};
