const { checkServiceKey } = require('../utils/chekServiceKey');

async function isPrivateRequest(ctx, next) {
  const { headers } = ctx;
  const { 'x-token': token, 'x-service-key': serviceKey } = headers;

  if (token) ctx.throw(403);
  if (!serviceKey) ctx.throw(401);

  checkServiceKey(serviceKey);

  return next();
}

module.exports = { isPrivateRequest };
