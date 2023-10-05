const BookRepository = require('../BookRepository');

describe('BookRepository interface', () => {
  it('should throw error when invoke abstract behaviour', async () => {
    // Arrange
    const bookRepository = new BookRepository();

    // Action and Assert
    await expect(bookRepository.updateBookStock('', '')).rejects.toThrowError('BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(bookRepository.getAllAvailableBooks()).rejects.toThrowError('BOOK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
