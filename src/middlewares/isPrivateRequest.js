const crypto = require('../utils/crypto');

async function isPrivateRequest(ctx, next) {
  const { headers } = ctx;
  const { 'x-token': token, 'x-service-token': serviceToken } = headers;

  if (token) ctx.throw(403);
  if (!serviceToken) ctx.throw(401);

  crypto.checkToken(serviceToken);

  return next();
}

module.exports = { isPrivateRequest };
