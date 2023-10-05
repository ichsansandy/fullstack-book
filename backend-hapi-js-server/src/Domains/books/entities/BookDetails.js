class BookDetails {
  constructor(payload) {
    this._verifyPayload(payload);

    this.code = payload.code
    this.title = payload.title
    this.author = payload.author
    this.stock = payload.stock
  }

  _verifyPayload(payload) {
    const { code, title, author, stock } = payload;

    if (!code || !title || !author || !stock) {
      throw new Error('BOOK_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof code !== 'string' ||
      typeof title !== 'string' ||
      typeof author !== 'string' ||
      typeof stock !== 'number'
    ) {
      throw new Error('BOOK_DETAILS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = BookDetails;
