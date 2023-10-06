const routes = (handler) => [
  {
    method: 'GET',
    path: '/books/available',
    handler: handler.getAvailableBooksHandler,
    options: {
      auth: 'book_jwt',
    },
  },
  {
    method: 'GET',
    path: '/books/rented',
    handler: handler.getRentedBooksHandler,
    options: {
      auth: 'book_jwt',
    },
  },
];

module.exports = routes;
