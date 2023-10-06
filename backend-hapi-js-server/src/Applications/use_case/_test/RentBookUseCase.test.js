const BookRepository = require("../../../Domains/books/BookRepository");
const RentRepository = require("../../../Domains/rents/RentRepository");
const RentBookUseCase = require("../RentBookUseCase");

describe('RentBookUseCase', () => {
  it('should orchestrating the create rent correctly', async() => {
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
      mockRentRepository.createRent = jest.fn().mockImplementation(() => Promise.resolve());

      /** creating use case instance */
      const createRentUseCase = new RentBookUseCase({
        bookRepository: mockBookRepository,
        rentRepository: mockRentRepository,
      });

      // Action
      await createRentUseCase.execute(useCasePayload);

      // Assert

      expect(mockBookRepository.updateBookStock).toBeCalledWith(useCasePayload.bookCode, 'rent');
      expect(mockRentRepository.createRent).toBeCalledWith(useCasePayload.memberCode, useCasePayload.bookCode);
  });
});
  


