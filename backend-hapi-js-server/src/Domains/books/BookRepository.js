class BookRepository {
  async updateBookStock(bookCode, action) {
    throw new Error('BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAllAvailableBooks(memberCode) {
    throw new Error('BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAllRentedBooks(memberCode) {
    throw new Error('BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = BookRepository;
