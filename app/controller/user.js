'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { nick_name, password, gender, email, qq, avatar } = ctx.request.body;
    const entity = { nick_name, password, gender, email, qq, avatar };
    const res = await ctx.service.user.register(entity);
    if (res) {
      ctx.status = 200;
    }
  }
}

module.exports = UserController;
