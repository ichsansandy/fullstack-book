class CreateRentUseCase {
  constructor({ bookRepository, rentRepository }) {
    this._bookRepository = bookRepository;
    this._rentRepository = rentRepository;
  }

  async execute(useCasePayload) {
    await this._bookRepository.updateBookStock(useCasePayload.bookCode, 'rent');
    await this._rentRepository.createRent(useCasePayload.memberCode, useCasePayload.bookCode);
  }
}

module.exports = CreateRentUseCase;
