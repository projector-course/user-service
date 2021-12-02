const Router = require('@koa/router');
const { postUserRoute } = require('./postUserRoute');
const { verifyUser } = require('../../../middlewares/verifyUser');
const { getUserRoute } = require('./getUserRoute');
const { getServiceRoute } = require('./getServiceRoute');

const router = new Router();

router
  .post('/', postUserRoute)
  .use('/:id', verifyUser)
  .get('/:id', getUserRoute)
  .get('/:id/:service', getServiceRoute);

module.exports = { usersRouter: router };
