const sql = require("./db.js");

class Mqtt {
  static login(uuid, token) {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT * FROM token WHERE user_uuid = ? AND token_value = ?`,
        [uuid, token],
        (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          if (res.length > 0 && res[0].token_type === "access") {
            console.log("Login successful for user:", uuid);
            resolve(true); // 登录成功时解析 Promise
          } else {
            console.log("Login failed for uuid:", uuid);
            resolve(false); // 登录失败时仍然解析 Promise，但传递 false
          }
        }
      );
    });
  }
}

module.exports = Mqtt;
