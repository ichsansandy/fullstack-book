const BookRepository = require('../../../Domains/books/BookRepository');
const RentRepository = require('../../../Domains/rents/RentRepository');
const ReturnBookUseCase = require('../ReturnBookUseCase');

describe('ReturnBookUseCase', () => {
  it('should orchestrating the create rent correctly', async () => {
    // Arrange
    const useCasePayload = {
      memberCode: 'M001',
      bookCode: 'TEST-1',
    };

    /** creating dependency of use case */
    const mockRentRepository = new RentRepository();
    const mockBookRepository = new BookRepository();

    /** mocking needed function */
    mockBookRepository.updateBookStock = jest.fn().mockImplementation(() => Promise.resolve());
    mockRentRepository.deleteRent = jest.fn().mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const createRentUseCase = new ReturnBookUseCase({
      bookRepository: mockBookRepository,
      rentRepository: mockRentRepository,
    });

    // Action
    await createRentUseCase.execute(useCasePayload);

    // Assert

    expect(mockBookRepository.updateBookStock).toBeCalledWith(useCasePayload.bookCode, 'return');
    expect(mockRentRepository.deleteRent).toBeCalledWith(useCasePayload.memberCode, useCasePayload.bookCode);
  });
});
