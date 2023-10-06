const RentBookUseCase = require('../../../../Applications/use_case/RentBookUseCase');
const ReturnBookUseCase = require('../../../../Applications/use_case/ReturnBookUseCase');

class RentHandler {
  constructor(container) {
    this._container = container;
    this.rentBookHandler = this.rentBookHandler.bind(this);
    this.returnBookHandler = this.returnBookHandler.bind(this);
  }

  async rentBookHandler(request) {
    const rentBookUseCase = this._container.getInstance(RentBookUseCase.name);
    const { id: memberCode } = request.auth.credentials;
    const { bookCode } = request.payload;
    await rentBookUseCase.execute({ memberCode, bookCode });
    
    return {
      status: 'success',
      message: 'Success rent a book'
    }
  }

  async returnBookHandler(request) {
    const returnBookUseCase = this._container.getInstance(ReturnBookUseCase.name);
    const { id: memberCode } = request.auth.credentials;
    const { bookCode } = request.payload;
    await returnBookUseCase.execute({ memberCode, bookCode });
    
    return {
      status: 'success',
      message: 'Success return a book'
    }
  }
}

module.exports = RentHandler;
