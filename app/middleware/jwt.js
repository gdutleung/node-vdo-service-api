'use strict';

const JWT = require('jsonwebtoken');

// 不需要鉴权的白名单
const tokenWhiteList = new Set([ '/user/login', '/user/register' ]);

module.exports = (options) => {
  return async function(ctx, next) {
    const token = ctx.request.header.authorization;
    // const method = ctx.method.toLowerCase();
    const url = ctx.request.url;
    if (!tokenWhiteList.has(url)) {
      // 需要鉴权
      if (token) {
        let decode;
        try {
          decode = JWT.verify(token, options.secret);
          if (
            !decode ||
            !decode.username ||
            !decode.password ||
            !decode.exp
          ) {
            ctx.status = 200;
            ctx.body = {
              code: -1,
              msg: '用户信息校验失败',
              isError: true,
            };
          } else if (Date.now() / 1000 - decode.exp > 0) {
            ctx.status = 200;
            ctx.body = {
              code: -1,
              msg: '用户token过期',
              isError: true,
            };
          } else {
            await next();
          }
        } catch (error) {
          ctx.status = 200;
          ctx.body = {
            code: -1,
            msg: '用户信息校验失败',
            isError: true,
          };
        }
      } else {
        ctx.status = 200;
        ctx.body = {
          code: -1,
          msg: '请先登录',
          isError: true,
        };
      }
    } else {
      // 不需要鉴权
      await next();
    }
  };
};
