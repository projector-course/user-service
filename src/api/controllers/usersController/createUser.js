const { getModuleLogger } = require('../../../services/logService');
const db = require('../../../db/models');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

const createUser = async (data) => {
  const result = await db.users.create({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return result;
};

module.exports = { createUser };
