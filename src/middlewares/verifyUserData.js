const { createUserSchema } = require('../api/schema');

const verifyUserData = async (ctx, next) => {
  const { request: { body } } = ctx;
  const { value, error } = createUserSchema.validate(body);

  if (error) ctx.throw(400, error.message);

  ctx.user = value;
  return next();
};

module.exports = { verifyUserData };
