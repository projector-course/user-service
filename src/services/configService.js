require('dotenv-defaults').config();
const settings = require('../settings');

/* -- general -- */
const { STAGE } = settings;
const NODE_ENV = process.env.NODE_ENV || STAGE.DEVELOPMENT;
const isTest = NODE_ENV === STAGE.TEST;
const isProd = NODE_ENV === STAGE.PRODUCTION;

/* -- server -- */
const { HOST, PORT } = process.env;
const BASE_URL = `http://${HOST}:${PORT}`;

/* -- logger settings -- */
const { LOGGER_TARGET, LOGGER_LEVEL } = settings;
const { LOG_TARGET, LOG_LEVEL } = process.env;
const { isTTY } = process.stdout;

let logTarget = !isProd && LOG_TARGET ? LOG_TARGET : LOGGER_TARGET.STDOUT;
if (logTarget === LOGGER_TARGET.CONSOLE && !isTTY) logTarget = LOGGER_TARGET.STDOUT;
const logLevel = !isProd && LOG_LEVEL ? LOG_LEVEL : LOGGER_LEVEL.INFO;

/* -- db config -- */
const {
  DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT,
} = process.env;

const {
  DB_TEST_NAME, DB_TEST_USER, DB_TEST_PASSWORD, DB_TEST_HOST, DB_TEST_PORT,
} = process.env;

const DB = {
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  define: {
    freezeTableName: true,
  },
};

const DB_TEST = {
  database: DB_TEST_NAME,
  username: DB_TEST_USER,
  password: DB_TEST_PASSWORD,
  host: DB_TEST_HOST,
  port: DB_TEST_PORT,
  dialect: 'postgres',
  define: {
    freezeTableName: true,
  },
};

module.exports = {
  ...process.env,
  ...settings,
  NODE_ENV,
  BASE_URL,
  LOG_TARGET: logTarget,
  LOG_LEVEL: logLevel,
  [NODE_ENV]: isTest ? DB_TEST : DB,
};
