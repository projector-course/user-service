const { getModuleLogger } = require('../../../services/logService');
const { getUser } = require('./getUser');
const { LoginParamsError } = require('../../../errors');
const { checkPassword } = require('../../../utils/crypto');
const { createToken } = require('../../../utils/crypto');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function loginUser({ email, password }) {
  const user = await getUser({ email });
  if (!user) throw new LoginParamsError();

  const verified = await checkPassword(password, user.password);
  if (!verified) throw new LoginParamsError();

  logger.debug(user, 'USER');

  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = createToken({ data });

  return { token };
}

module.exports = { loginUser };
