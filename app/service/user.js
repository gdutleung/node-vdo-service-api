'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async register(data) {
    const user = await this.ctx.model.User.create(data);
    return user;
  }
}

module.exports = UserService;
