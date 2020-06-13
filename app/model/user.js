'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: {
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
    updated_at: {
      type: DATE,
      defaultValue: () => new Date(),
    },
    level: {
      type: INTEGER,
      defaultValue: () => 0,
    },
  });

  return User;
};
