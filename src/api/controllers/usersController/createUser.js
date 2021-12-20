const { getModuleLogger } = require('../../../services/logService');
const { getUser } = require('./getUser');
const { UserExistError } = require('../../../errors');
const { hashPassword } = require('../../../utils/crypto');
const db = require('../../../db/models');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function createUser(data) {
  const { email } = data;
  const user = await getUser({ email });
  if (user) throw new UserExistError();

  const password = await hashPassword(data.password);

  const result = await db.users.create({ ...data, password });

  const { password: _, ...newUser } = result.get({ plain: true });

  return newUser;
}

module.exports = { createUser };
