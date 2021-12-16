const { checkToken } = require('../utils/crypto');
const { tokenUserSchema } = require('../api/schema');
const { getUser } = require('../api/controllers/usersController/getUser');
const { BadTokenError } = require('../errors');

const isAuth = async (ctx, next) => {
  const { headers } = ctx;

  const { 'x-token': token } = headers;
  if (!token) ctx.throw(401);

  const { data } = checkToken(token);

  const { error } = tokenUserSchema.validate(data);
  if (error) throw new BadTokenError();

  const result = await getUser({ id: data.id });
  if (!result) throw new BadTokenError();

  const { password, ...user } = result;

  ctx.user = user;

  return next();
};

module.exports = { isAuth };
