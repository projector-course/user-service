const Router = require('@koa/router');
const { validate } = require('../../../middlewares/validator');
const { createUser } = require('../../controllers/usersController/createUser');
const { getUserData } = require('../../controllers/usersController/getUserData');
const { VerificationError } = require('../../../errors/verificationError');
const { getUserService } = require('../../controllers/usersController/getUserService');
const { SERVICES } = require('../../../services/configService');

const router = new Router();

router.post('/', validate.post, async (ctx) => {
  const { path, request: { body } } = ctx;
  ctx.log.debug('ROUTE: %s', path);

  ctx.body = await createUser(body);
});

router.get('/:id', validate.get, async (ctx) => {
  const { path, params } = ctx;
  ctx.log.debug('ROUTE: %s', path);

  let userData;
  try {
    userData = await getUserData(params);
  } catch (e) {
    if (!(e instanceof VerificationError)) throw e;
    ctx.throw(404);
  }

  ctx.body = userData;
});

router.get('/:id/:service', validate.get, async (ctx) => {
  const { path, params: { service, id } } = ctx;
  ctx.log.debug('ROUTE: %s', path);

  if (!SERVICES.includes(service)) ctx.throw(404);

  let userServiceData;
  try {
    userServiceData = await getUserService({ service, id });
  } catch (e) {
    if (!(e instanceof VerificationError)) throw e;
    ctx.throw(404);
  }

  ctx.body = userServiceData;
});

module.exports = { usersRouter: router };
