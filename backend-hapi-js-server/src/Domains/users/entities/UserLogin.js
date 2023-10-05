class UserLogin {
  constructor(payload) {
    this._verifyPayload(payload);

    this.name = payload.name;
    this.password = payload.password;
  }

  _verifyPayload(payload) {
    const { name, password } = payload;

    if (!name || !password) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof name !== 'string' || typeof password !== 'string') {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UserLogin;
