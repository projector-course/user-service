const { getModuleLogger } = require('../../../services/logService');
const db = require('../../../db/models');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

function createUser(user) {
  return db.users.create(user);
}

module.exports = { createUser };
