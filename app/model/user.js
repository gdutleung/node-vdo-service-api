'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    nick_name: STRING(30),
    password: STRING,
    gender: INTEGER,
    email: STRING,
    last_sign_in_at: DATE,
    created_at: DATE,
    updated_at: DATE,
  });

  return User;

};
