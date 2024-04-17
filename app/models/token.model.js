const sql = require("./db.js");

class Token {
  // 创建token
  static create(uuid, token) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO token (user_uuid, token_value) VALUES (?, ?)",
        [uuid, token],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  // 获取token
  static get(uuid) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT user_uuid,token_value FROM token WHERE user_uuid = ?",
        uuid,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  // 更新token
  static update(token_value, user_uuid) {
    // 假设 tokenData 包含 uuid 和要更新的其他字段
    return new Promise((resolve, reject) => {
      sql.query(
        "UPDATE token SET token_value = ? WHERE user_uuid = ?",
        [token_value, user_uuid],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  // 验证token
  static verify(uuid, token) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT * FROM token WHERE user_uuid = ? AND token_value = ?",
        [uuid, token],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  // 删除token
  static delete(uuid) {
    return new Promise((resolve, reject) => {
      sql.query("DELETE FROM token WHERE user_uuid = ?", uuid, (res, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = Token;
