const { getUserData } = require('../../controllers/usersController/getUserData');

const getUserRoute = async (ctx) => {
  const { path, user } = ctx;
  ctx.log.debug('ROUTE: %s', path);

  const data = await getUserData(user);

  ctx.body = {
    ...user, ...data,
  };
};

module.exports = { getUserRoute };
