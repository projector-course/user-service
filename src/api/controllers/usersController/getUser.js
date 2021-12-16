const { getModuleLogger } = require('../../../services/logService');
const db = require('../../../db/models');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getUser(data) {
  const user = await db.users.findOne({
    where: data,
  });

  return user?.get({ plain: true });
}

module.exports = { getUser };
