const packageJson = require('../../../package.json');
const { getModuleLogger } = require('../../services/logService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

const getHealth = () => {
  const { name, version } = packageJson;
  return {
    name,
    version,
  };
};

module.exports = { getHealth };
