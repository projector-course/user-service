const STAGE = {
  DEVELOPMENT: 'development',
  TEST: 'test',
  PRODUCTION: 'production',
};

const LOGGER_LEVEL = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

const LOGGER_TARGET = {
  CONSOLE: 'console',
  STDOUT: 'stdout',
};

const SERVICES = ['videos', 'history', 'subscriptions'];

module.exports = {
  STAGE,
  LOGGER_TARGET,
  LOGGER_LEVEL,
  SERVICES,
};
