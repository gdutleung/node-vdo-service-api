'use strict';

module.exports = {
  sequelize: {
    // 数据库类型
    dialect: 'mysql',
    // 数据库名
    database: 'vdo',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: '123456',
    underscored: true,
    timezone: '+08:00',
  },
};
