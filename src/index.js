const { getModuleLogger } = require('./services/logService');
const { app } = require('./server');
const { PORT, BASE_URL, SERVICE_NAME } = require('./services/configService');

const logger = getModuleLogger(module);
logger.debug('APP CREATED');

app.listen(PORT, () => logger.info(`${SERVICE_NAME} is running on ${BASE_URL}`));
