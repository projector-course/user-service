const { getModuleLogger } = require('../../../services/logService');
const gateway = require('../../../services/gatewayService');
const { SERVICES } = require('../../../services/configService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getUserData(user) {
  const requests = SERVICES.map((service) => gateway.get(service, user));

  const results = await Promise.allSettled([...requests]);

  const data = results.reduce((r, result, i) => {
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

  return data;
}

module.exports = { getUserData };
