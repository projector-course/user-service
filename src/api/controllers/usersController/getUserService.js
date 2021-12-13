const { getModuleLogger } = require('../../../services/logService');
const { getUser } = require('./getUser');
const gateway = require('../../../services/gatewayService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getUserService({ service, id, limit }) {
  const user = await getUser({ id });

  return gateway.get(service, user, limit);
}

module.exports = { getUserService };
