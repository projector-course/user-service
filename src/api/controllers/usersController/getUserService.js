const { getModuleLogger } = require('../../../services/logService');
const gateway = require('../../../services/gatewayService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getUserService(userToken, { service, limit }) {
  return gateway.get(service, userToken, limit);
}

module.exports = { getUserService };
