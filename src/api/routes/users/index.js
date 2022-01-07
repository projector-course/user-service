const Router = require('@koa/router');
const { validate } = require('../../../middlewares/validator');
const { createUser } = require('../../controllers/usersController/createUser');
const { loginUser } = require('../../controllers/usersController/loginUser');
const { isAuth } = require('../../../middlewares/isAuth');
const { isPrivateRequest } = require('../../../middlewares/isPrivateRequest');
const { getUserData } = require('../../controllers/usersController/getUserData');
const { getUser } = require('../../controllers/usersController/getUser');
const { getUserService } = require('../../controllers/usersController/getUserService');

const router = new Router();

/*
  - POST  /users { data: { name, email, password } }    => создаём пользователя
  - POST  /users / login { data: { email, password } }  => логинизация
  - GET   /users / me                                   =>
      получаем польз., его подписки, видео и историю
  - GET   /users / service / history                    => получаем историю просмотров пользователя
  - GET   /users / service / subscriptions              => получаем подписки пользователя
  - GET   /users / service / videos                     => получаем видео пользователя
  - GET   /users / :id                                  => получаем пользователя
*/

router.post('/', validate.post, async (ctx) => {
  const { path, request: { body } } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  const user = await createUser(body);
  ctx.status = 201;
  ctx.body = user;
});

router.post('/login', validate.login, async (ctx) => {
  const { path, request: { body } } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  ctx.body = await loginUser(body);
});

router.get('/me', isAuth, async (ctx) => {
  const { path, user, headers } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  const { 'x-token': token } = headers;
  const userData = await getUserData(token);
  ctx.body = { ...user, ...userData };
});

router.get('/service/:service', isAuth, validate.service, async (ctx) => {
  const { path, params } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  const { 'x-token': token } = ctx.headers;
  ctx.body = await getUserService(token, params);
});

router.get('/:id', isPrivateRequest, validate.get, async (ctx) => {
  const { path, params } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  const user = await getUser(params);
  if (!user) ctx.throw(404);
  ctx.body = user;
});

module.exports = { usersRouter: router };
