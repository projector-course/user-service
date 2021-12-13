module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: 'j.doe@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
