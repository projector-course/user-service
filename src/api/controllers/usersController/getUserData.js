const { getModuleLogger } = require('../../../services/logService');
const { SERVICES } = require('../../../services/configService');
const gateway = require('../../../services/gatewayService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getUserData(userToken) {
  const requests = SERVICES.map((service) => gateway.get(service, userToken));

  const results = await Promise.allSettled([...requests]);

  const userData = results.reduce((r, result, i) => {
    const service = SERVICES[i];
    const { status, value, reason: e } = result;

    /* -- if error -- */
    if (status === 'rejected') {
      const { type, message } = e;
      logger.warn({ service, type }, message);
      Object.assign(r, { [service]: null });
      return r;
    }

    /* -- if success -- */
    Object.assign(r, { [service]: value });
    return r;
  }, {});

  return userData;
}

module.exports = { getUserData };
