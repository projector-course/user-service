const { createUser } = require('../../controllers/usersController/createUser');

const postUserRoute = async (ctx) => {
  const { request, path } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  ctx.body = await createUser(request.body);
};

module.exports = { postUserRoute };
