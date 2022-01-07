const Koa = require('koa');
const getParser = require('koa-bodyparser');
const { getModuleLogger } = require('./services/logService');
const { errorHandler } = require('./middlewares/errorHandler');
const { getMetrics } = require('./middlewares/getMetrics');
const { koaLogger } = require('./middlewares/koaLogger');
const { router } = require('./api/router');

const logger = getModuleLogger(module);
logger.debug('APP CREATED');

const app = new Koa()
  .use(errorHandler)
  .use(getMetrics)
  .use(koaLogger)
  .use(getParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', (e) => logger.fatal(e));

process.on('unhandledRejection', (e) => {
  logger.error(e, 'Unhandled rejection at promise');
  logger.info('Server is still running...');
});

process.on('uncaughtException', (e) => {
  logger.fatal(e, 'Uncaught exception');
  process.nextTick(() => process.exit());
});

module.exports = { app };
