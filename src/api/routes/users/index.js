const Router = require('@koa/router');
const { validate } = require('../../../middlewares/validator');
const { createUser } = require('../../controllers/usersController/createUser');
const { getUserData } = require('../../controllers/usersController/getUserData');
const { getUserService } = require('../../controllers/usersController/getUserService');

const router = new Router();

/*
  - POST  /users { data: { name, email } }  => создаём пользователя
  - GET   /users / :id                      => получаем пользователя, его подписки, видео и историю
  - GET   /users / :id/history              => получаем историю просмотров пользователя
  - GET   /users / :id/subscriptions        => получаем подписки пользователя
  - GET   /users / :id/videos               => получаем видео пользователя
*/

router.post('/', validate.post, async (ctx) => {
  const { path, request: { body } } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  ctx.body = await createUser(body);
});

router.get('/:id', validate.get, async (ctx) => {
  const { path, params } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  ctx.body = await getUserData(params);
});

router.get('/:id/:service', validate.get, async (ctx) => {
  const { path, params } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  ctx.body = await getUserService(params);
});

module.exports = { usersRouter: router };
