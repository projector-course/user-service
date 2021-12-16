const { GATEWAY_URL, GATEWAY_TOKEN } = require('./configService');
const { getModuleLogger } = require('./logService');
const { getJson } = require('../utils/getJson');

const logger = getModuleLogger(module);
logger.debug('SERVICE CREATED');

function get(service, userToken, limit) {
  const userPar = ''; // `userId=${user.id}`;
  const limitPar = limit ? `&limit=${limit}` : '';
  const url = `${GATEWAY_URL}/${service}?${userPar}${limitPar}`;

  logger.debug(url);

  return getJson(url, { headers: { 'x-token': userToken, 'x-service-token': GATEWAY_TOKEN } });
}

module.exports = { get };
