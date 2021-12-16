/* eslint-disable max-classes-per-file */
class UserExistError extends Error {
  constructor(message = 'User already exist') {
    super(message);
    this.name = 'UserExistError';
    this.status = 409;
  }
}

class LoginParamsError extends Error {
  constructor(message = 'Wrong email or password') {
    super(message);
    this.name = 'LoginParamsError';
    this.status = 400;
  }
}

class BadTokenError extends Error {
  constructor(message = 'Bad token') {
    super(message);
    this.name = 'BadTokenError';
    this.status = 400;
  }
}

module.exports = {
  UserExistError,
  LoginParamsError,
  BadTokenError,
};
