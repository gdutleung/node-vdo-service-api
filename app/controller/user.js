'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * 注册接口
   */
  async register() {
    const { ctx } = this;
    const { username, password, gender, email, qq, avatar } = ctx.request.body;
    const entity = { username, password, gender, email, qq, avatar };
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
    const { ctx } = this;
    const { request } = ctx;
    const { username, password } = request.body;

    const res = await ctx.service.user.login({ username, password });
    // console.log({ res });

    this.ctx.body = res;
    this.ctx.status = 200;
  }
  /**
   * 查询用户信息
   */
  async getUserInfo() {

    const { state, service } = this.ctx;
    console.log('-----------------', state);
    const { username, password } = state;
    const user = await service.user.findUser({ username, password });
    // console.log('------------', user);

    this.ctx.status = 200;
    this.ctx.body = {
      msg: 'ok',
      code: 0,
    };
  }
}

module.exports = UserController;
