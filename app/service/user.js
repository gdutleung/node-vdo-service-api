'use strict';

const Service = require('egg').Service;
const JWT = require('jsonwebtoken');

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
   * 登录
   * @param {*} loginData
   */
  async login(loginData) {
    const { ctx } = this;
    const res = {};
    const { username, password } = loginData;

    // 在当前数据库中验证此用户思否存在
    const queryResult = await ctx.model.User.findOne({
      where: {
        username,
      },
    });
    if (!queryResult) {
      res.code = -2;
      res.msg = '用户不存在，请前去注册';
      res.status = 'failed';
    } else {
      const result = await ctx.model.User.findOne({
        where: {
          username,
          password,
        },
      });

      if (!result) {
        res.code = -1;
        res.msg = '用户信息不正确';
        res.status = 'failed';
      } else {
        // 签发token;
        const token = JWT.sign(
          {
            username: result.username,
          },
          this.config.jwt.secret,
          {
            expiresIn: 60 * 60,
          }
        );
        res.code = 1;
        res.token = token;
        res.status = 'ok';
      }
    }

    return res;
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
