class ReturnBookUseCase {
  constructor({ bookRepository, rentRepository }) {
    this._bookRepository = bookRepository;
    this._rentRepository = rentRepository;
  }

  async execute(useCasePayload) {
    await this._bookRepository.updateBookStock(useCasePayload.bookCode, 'return');
    await this._rentRepository.deleteRent(useCasePayload.memberCode, useCasePayload.bookCode);
  }
}

module.exports = ReturnBookUseCase;
