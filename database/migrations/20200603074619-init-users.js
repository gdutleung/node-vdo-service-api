'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nick_name: {
        type: STRING(30),
        allowNull: false,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
      gender: INTEGER,
      email: STRING,
      last_sign_in_at: DATE,
      qq: STRING,
      created_at: {
        type: DATE,
        defaultValue: () => new Date(),
      },
      level: {
        type: INTEGER,
        defaultValue: () => 0,
      },
      updated_at: {
        type: DATE,
        defaultValue: () => new Date(),
      },
      avatar: {
        type: STRING,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
