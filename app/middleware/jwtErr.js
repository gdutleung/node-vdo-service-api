'use strict';

module.exports = (options, app) => {
  return async function(ctx, next) {
    try {
      await next();
    } catch (error) {
      console.log(error);

      ctx.status = 401;
      ctx.body = {
        msg: '身份过期，请重新登录',
        code: -1,
      };
    }
  };
};
