const Router = require('@koa/router');
const { verifyUserData } = require('../../../middlewares/verifyUserData');
const { postUserRoute } = require('./postUserRoute');
const { verifyParams } = require('../../../middlewares/verifyParams');
const { getUserRoute } = require('./getUserRoute');
const { getServiceRoute } = require('./getServiceRoute');

const router = new Router();

router
  .post('/', verifyUserData, postUserRoute)
  .use('/:id', verifyParams)
  .get('/:id', getUserRoute)
  .get('/:id/:service', getServiceRoute);

module.exports = { usersRouter: router };
