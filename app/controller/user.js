'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
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
  async login() {
    const { ctx, app } = this;
    const { request } = ctx;
    const { username } = request.body;

    // 验证数据是否登录成功
    console.log('request', request);

    // 生成token
    const token = app.jwt.sign({
      username,
    }, app.config.jwt.secret);
    ctx.body = {
      code: 0,
      msg: 'ok',
      token,
    };
  }
}

module.exports = UserController;
