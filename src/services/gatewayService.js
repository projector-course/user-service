const { GATEWAY_URL, SERVICE_KEY } = require('./configService');
const { getModuleLogger } = require('./logService');
const { getJson } = require('../utils/getJson');

const logger = getModuleLogger(module);
logger.debug('SERVICE CREATED');

function get(service, userToken, limit) {
  const userPar = ''; // `userId=${user.id}`;
  const limitPar = limit ? `&limit=${limit}` : '';
  const url = `${GATEWAY_URL}/${service}?${userPar}${limitPar}`;

  logger.debug(url);

  const headers = { 'x-token': userToken, 'x-service-key': SERVICE_KEY };
  return getJson(url, { headers });
}

module.exports = { get };
