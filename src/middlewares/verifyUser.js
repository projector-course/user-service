const { findUser } = require('../api/controllers/usersController/findUser');
const { strToInteger } = require('../utils/helpers');

const verifyUser = async (ctx, next) => {
  const { params } = ctx;

  const id = strToInteger(params.id);
  if (id === undefined) return ctx.throw(400);

  const user = await findUser(id);
  if (!user) ctx.throw(404);

  ctx.log.debug({ user }, 'USER');

  ctx.user = user;

  return next();
};

module.exports = { verifyUser };
