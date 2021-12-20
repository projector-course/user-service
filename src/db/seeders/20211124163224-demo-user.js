const { hashPassword } = require('../../utils/crypto');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: 'j.doe@gmail.com',
      password: await hashPassword('1111'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
