const { getModuleLogger } = require('../../../services/logService');
const { getUser } = require('./getUser');
const { SERVICES } = require('../../../services/configService');
const gateway = require('../../../services/gatewayService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getUserData({ id }) {
  const user = await getUser({ id });

  const requests = SERVICES.map((service) => gateway.get(service, { id }));

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

  return { ...user, ...userData };
}

module.exports = { getUserData };
