const RentRepository = require('../RentRepository');

describe('RentRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const rentRepository = new RentRepository();

    // Action and Assert
    await expect(rentRepository.createRent('', '')).rejects.toThrowError('RENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(rentRepository.deleteRent('', '')).rejects.toThrowError('RENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
