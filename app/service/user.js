'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 新增user
   * @param {} data
   */
  async register(data) {
    const user = await this.ctx.model.User.create(data);
    return user;
  }
  /**
   * 查找用户
   * @param {*} options
   */
  async findUser(options) {
    const user = await this.ctx.model.User.findOne({
      where: options,
    });
    return user;
  }
}

module.exports = UserService;
