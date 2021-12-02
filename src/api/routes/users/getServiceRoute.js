const gateway = require('../../../services/gatewayService');

const getServiceRoute = async (ctx) => {
  const { path, user, params } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  ctx.body = await gateway.get(params.service, user);
};

module.exports = { getServiceRoute };
