const { getModuleLogger } = require('../../../services/logService');
const db = require('../../../db/models');
const { VerificationError, VERIFICATION_ERROR_TYPE } = require('../../../errors/verificationError');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getUser({ id }) {
  const result = await db.users.findOne({
    where: { id },
  });

  const { dataValues: user } = result || {};

  if (user) return user;

  throw new VerificationError(VERIFICATION_ERROR_TYPE.NOT_FOUND_ERROR, 'User not exist');
}

module.exports = { getUser };
