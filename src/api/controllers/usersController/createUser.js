const { getModuleLogger } = require('../../../services/logService');
const db = require('../../../db/models');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function createUser(data) {
  return db.users.create(data);
}

module.exports = { createUser };
