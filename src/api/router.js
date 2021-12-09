const Router = require('@koa/router');
const { PREFIX: prefix } = require('../services/configService');
const { getHealthRoute } = require('./routes/health/getHealthRoute');
const { usersRouter } = require('./routes/users');

const router = new Router({ prefix });

/*
  - GET     /users/health

  - POST  /users { data: { name, email } }  => создаём пользователя
  - GET   /users / :id                      => получаем пользователя, его подписки, видео и историю
  - GET   /users / :id/history              => получаем историю просмотров пользователя
  - GET   /users / :id/subscriptions        => получаем подписки пользователя
  - GET   /users / :id/videos               => получаем видео пользователя
*/

router
  .get('/health', getHealthRoute)
  .use(usersRouter.routes(), usersRouter.allowedMethods());

module.exports = { router };
