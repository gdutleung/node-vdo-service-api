'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { nick_name, password, gender, email } = ctx.request.body;
    const updated_at = new Date();
    const entity = { nick_name, password, gender, email, updated_at };
    const res = await ctx.service.user.register(entity);
    if (res) {
      ctx.status = 200;
    }
  }
}

module.exports = UserController;
