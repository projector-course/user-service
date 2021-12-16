const { get } = require('axios');
const { HttpRequestError, REQUEST_ERROR_TYPE } = require('../errors/httpRequestError');

function getJson(url, options) {
  return get(url, options)
    .then((res) => {
      const { headers, data } = res;
      const { 'content-type': contentType } = headers;
      if (!/^application\/json/.test(contentType)) {
        throw new HttpRequestError(REQUEST_ERROR_TYPE.DATA_ERROR, 'Wron content-type');
      }
      if (typeof data === 'string') {
        throw new HttpRequestError(REQUEST_ERROR_TYPE.DATA_ERROR, 'Wron data format');
      }
      return data;
    })
    .catch((e) => {
      if (e instanceof HttpRequestError) throw e;
      const { response, request, message } = e;
      if (response) throw new HttpRequestError(REQUEST_ERROR_TYPE.RESPONSE_ERROR, message);
      if (request) throw new HttpRequestError(REQUEST_ERROR_TYPE.NETWORK_ERROR, message);
      throw e;
    });
}

module.exports = { getJson };
