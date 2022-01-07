const Router = require('@koa/router');
const { PREFIX: prefix } = require('../services/configService');
const { getHealthRoute } = require('./routes/health/getHealthRoute');
const { usersRouter } = require('./routes/users');

const router = new Router({ prefix });

/*
  - GET     /users/health

  - POST  /users { data: { name, email, password } }    => создаём пользователя
  - POST  /users / login { data: { email, password } }  => логинизация
  - GET   /users / me                                   =>
      получаем польз., его подписки, видео и историю
  - GET   /users / service / history                    => получаем историю просмотров пользователя
  - GET   /users / service / subscriptions              => получаем подписки пользователя
  - GET   /users / service / videos                     => получаем видео пользователя
  - GET   /users / :id                                  => получаем пользователя
*/

router
  .get('/health', getHealthRoute)
  .use(usersRouter.routes(), usersRouter.allowedMethods());

module.exports = { router };
