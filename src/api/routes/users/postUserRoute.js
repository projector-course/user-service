const { createUser } = require('../../controllers/usersController/createUser');

const postUserRoute = async (ctx) => {
  const { path, user } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  ctx.body = await createUser(user);
};

module.exports = { postUserRoute };
