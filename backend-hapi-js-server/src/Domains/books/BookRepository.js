class BookRepository {
  async updateBookStock(bookCode, action) {
    throw new Error('BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAllAvailableBooks() {
    throw new Error('BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = BookRepository;
