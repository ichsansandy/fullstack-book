const BookDetails = require('../BookDetails');

describe('BookDetails entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      code: 'TS-12',
      author: 'Oda',
      title: 'One Piece',
    };

    // Action & Assert
    expect(() => new BookDetails(payload)).toThrowError('BOOK_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      code: 'TS-12',
      author: 'Oda',
      title: 'One Piece',
      stock: '1',
    };

    // Action & Assert
    expect(() => new BookDetails(payload)).toThrowError('BOOK_DETAILS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create BookDetails entities correctly', () => {
    // Arrange
    const payload = {
      code: 'TS-12',
      author: 'Oda',
      title: 'One Piece',
      stock: 1,
    };

    // Action
    const bookDetails = new BookDetails(payload);

    // Assert
    expect(bookDetails).toBeInstanceOf(BookDetails);
    expect(bookDetails.code).toEqual(payload.code);
    expect(bookDetails.author).toEqual(payload.author);
    expect(bookDetails.title).toEqual(payload.title);
    expect(bookDetails.stock).toEqual(payload.stock);
  });
});
