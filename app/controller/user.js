'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * 注册接口
   */
  async register() {
    const { ctx } = this;
    const { nick_name, password, gender, email, qq, avatar } = ctx.request.body;
    const entity = { nick_name, password, gender, email, qq, avatar };
    const res = await ctx.service.user.register(entity);
    if (res) {
      ctx.body = { code: 0, msg: '验证成功' };
      ctx.status = 200;
    }
  }
  /**
   * 登录接口
   */
  async login() {
    const { ctx, app } = this;
    const { request } = ctx;
    const { username, password } = request.body;

    // 验证数据是否登录成功
    const user = await ctx.service.user.findUser({
      nick_name: username,
      password,
    });
    if (user) {
      // 生成token
      const token = app.jwt.sign(
        {
          username,
          password,
        },
        app.config.jwt.secret
      );
      ctx.body = {
        code: 0,
        msg: 'ok',
        token,
      };
    } else {
      ctx.body = {
        code: -1,
        msg: '登录失败',
      };
    }
  }
  /**
   * 查询用户信息
   */
  async getUserInfo() {
    const { state, service } = this.ctx;
    const { username, password } = state;
    const user = await service.user.findUser({ username, password });
    console.log('------------', user);

    this.ctx.status = 200;
    this.ctx.body = {
      msg: 'ok',
      code: 0,
    };
  }
}

module.exports = UserController;
