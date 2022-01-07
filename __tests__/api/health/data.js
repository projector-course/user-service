const TEST_DATA = [
  {
    info: 'GET request RETURN JSON',
    reqData: {
      method: 'get',
      path: '/health',
    },
    resData: {
      statusCode: 200,
      contentType: /json/,
    },
  },
  {
    info: 'POST request NOT ALLOWED',
    reqData: {
      method: 'post',
      path: '/health',
    },
    resData: {
      statusCode: 405,
      contentType: /text/,
      resBody: 'Method Not Allowed',
    },
  },
  {
    info: 'DELETE request NOT ALLOWED',
    reqData: {
      method: 'delete',
      path: '/health',
    },
    resData: {
      statusCode: 405,
      contentType: /text/,
      resBody: 'Method Not Allowed',
    },
  },
  {
    info: 'PUT request NOT ALLOWED',
    reqData: {
      method: 'put',
      path: '/health',
    },
    resData: {
      statusCode: 405,
      contentType: /text/,
      resBody: 'Method Not Allowed',
    },
  },
];

module.exports = { TEST_DATA };
