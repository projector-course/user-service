const { paramsSchema } = require('../api/schema');
const { findUser } = require('../api/controllers/usersController/findUser');

const verifyParams = async (ctx, next) => {
  const { params } = ctx;

  const { value, error } = paramsSchema.validate(params);
  if (error) ctx.throw(400, error.message);

  const user = await findUser(value);
  if (!user) ctx.throw(404);

  ctx.log.debug({ user }, 'USER');

  ctx.user = user;

  return next();
};

module.exports = { verifyParams };
