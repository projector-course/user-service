const { getModuleLogger } = require('../../../services/logService');
const { getUser } = require('./getUser');
const { VerificationError, VERIFICATION_ERROR_TYPE } = require('../../../errors/verificationError');
const gateway = require('../../../services/gatewayService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getUserService({ service, id, limit }) {
  const user = await getUser({ id });
  if (!user) throw new VerificationError(VERIFICATION_ERROR_TYPE.NOT_FOUND_ERROR);

  return gateway.get(service, user, limit);
}

module.exports = { getUserService };
