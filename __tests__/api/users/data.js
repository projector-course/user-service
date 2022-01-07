const USER_DATA = {
  name: 'Test Name',
  email: 'test@test.com',
  password: '12345',
};

const { password, ...USER } = USER_DATA;
const { name, ...USER_LOGIN } = USER_DATA;

const TEST_CREATE_DATA = [
  {
    info: 'POST request with WRONG DATA',
    reqData: {
      method: 'post',
      path: '/',
      body: USER,
    },
    resData: {
      statusCode: 400,
      contentType: /text/,
    },
  },
  {
    info: 'POST request RETURN JSON',
    reqData: {
      method: 'post',
      path: '/',
      body: USER_DATA,
    },
    resData: {
      statusCode: 201,
      contentType: /json/,
      resBody: USER,
    },
  },
];

const TEST_LOGIN_DATA = [
  {
    info: 'LOGIN request with WRONG DATA',
    reqData: {
      method: 'post',
      path: '/login',
      body: { name: USER.name },
    },
    resData: {
      statusCode: 400,
      contentType: /text/,
    },
  },
  {
    info: 'LOGIN request RETURN TOKEN',
    reqData: {
      method: 'post',
      path: '/login',
      body: USER_LOGIN,
    },
    resData: {
      statusCode: 200,
      contentType: /json/,
      resBody: true,
    },
  },
];

const TEST_ME_DATA = [
  {
    info: 'GET request RETURN JSON',
    reqData: {
      method: 'get',
      path: '/me',
    },
    resData: {
      statusCode: 200,
      contentType: /json/,
      resBody: USER,
    },
  },
];

const TEST_GET_DATA = [
  {
    info: 'GET request with WRONG ID',
    reqData: {
      method: 'get',
      path: '/',
      param: 999,
    },
    resData: {
      statusCode: 404,
      contentType: /text/,
    },
  },
  {
    info: 'GET request RETURN JSON',
    reqData: {
      method: 'get',
      path: '/',
    },
    resData: {
      statusCode: 200,
      contentType: /json/,
      resBody: USER,
    },
  },
];

module.exports = {
  TEST_CREATE_DATA, TEST_LOGIN_DATA, TEST_ME_DATA, TEST_GET_DATA,
};
