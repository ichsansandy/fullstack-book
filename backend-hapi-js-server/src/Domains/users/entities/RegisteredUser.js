class RegisteredUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { code, name } = payload;

    this.code = code;
    this.name = name;
  }

  _verifyPayload({ code, name }) {
    if (!code || !name) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof code !== 'string' || typeof name !== 'string') {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisteredUser;
