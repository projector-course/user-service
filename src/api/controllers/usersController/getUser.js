const { getModuleLogger } = require('../../../services/logService');
const db = require('../../../db/models');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getUser({ id }) {
  const result = await db.users.findOne({
    where: { id },
  });

  const { dataValues: user } = result || {};

  return user;
}

module.exports = { getUser };
