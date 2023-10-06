const routes = (handler) => [
  {
    method: 'POST',
    path: '/rent',
    handler: handler.rentBookHandler,
    options: {
      auth: 'book_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/rent',
    handler: handler.returnBookHandler,
    options: {
      auth: 'book_jwt',
    },
  },
];

