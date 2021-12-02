const db = require('../../../db/models');
const { getModuleLogger } = require('../../../services/logService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

const findUser = async (id) => {
  const result = await db.users.findOne({
    where: { id },
  });

  const { dataValues: user } = result || {};

  return user;
};

module.exports = { findUser };
