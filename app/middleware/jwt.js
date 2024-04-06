/* const jwt = require("jsonwebtoken"); // 引入验证jsonwebtoken模块 */
const { expressjwt } = require("express-jwt"); // 引入express-jwt模块
const mySecret = require("../config/config").SECRET;

// 验证token是否过期
const jwtAuth = expressjwt({
  // 设置密钥
  secret: mySecret,
  // 设置为true表示校验，false表示不校验
  credentialsRequired: true,
  // 加入算法
  algorithms: ["HS256"],
  // 自定义获取token的函数
/*   getToken: (req) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      console.log(req.headers.authorization.split(" ")[1]);
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
  }, */
  // 设置jwt认证白名单，比如/login登录接口不需要拦截
}).unless({
  path: ["/api/users/register", "/api/users/login"],
});

module.exports = jwtAuth;
