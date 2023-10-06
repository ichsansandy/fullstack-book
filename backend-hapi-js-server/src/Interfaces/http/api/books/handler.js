const BookRepositoryPostgres = require('../../../../Infrastructures/repository/BookRepositoryPostgres');

class BooksHandler {
  constructor(container) {
    this._container = container;
    this.getAvailableBooksHandler = this.getAvailableBooksHandler.bind(this);
    this.getRentedBooksHandler = this.getRentedBooksHandler.bind(this);
  }

  async getAvailableBooksHandler(request, h) {
    const bookRepositoryPostgres = this._container.getInstance(BookRepositoryPostgres.name);
    const { id: memberCode } = request.auth.credentials;
    const booksAvailable = await bookRepositoryPostgres.getAllAvailableBooks(memberCode);

    const response = h.response({
      status: 'success',
      data: {
        booksAvailable,
      },
    });
    return response;
  }

  async getRentedBooksHandler(request, h) {
    const bookRepositoryPostgres = this._container.getInstance(BookRepositoryPostgres.name);
    const { id: memberCode } = request.auth.credentials;
    const booksAvailable = await bookRepositoryPostgres.getAllRentedBooks(memberCode);

    const response = h.response({
      status: 'success',
      data: {
        booksAvailable,
      },
    });
    return response;
  }
}

module.exports = BooksHandler;
