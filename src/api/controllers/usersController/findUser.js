const db = require('../../../db/models');
const { getModuleLogger } = require('../../../services/logService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function findUser(data) {
  const result = await db.users.findOne({
    where: data,
  });

  const { dataValues: user } = result || {};

  return user;
}

module.exports = { findUser };
