const sql = require("./db.js");

class Token {
  // 创建token
  static create(token) {
    return new Promise((resolve, reject) => {
      sql.query("INSERT INTO token SET ?", token, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  // 获取token
  static get(uuid) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT token_value FROM token WHERE uuid = ?",
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
  static update(data) {
    // 假设 tokenData 包含 uuid 和要更新的其他字段
    return new Promise((resolve, reject) => {
      sql.query(
        "UPDATE token SET ? WHERE uuid = ?",
        [tokenData, tokenData.uuid],
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
        "SELECT * FROM token WHERE uuid = ? AND token = ?",
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
  static delete(token) {
    return new Promise((resolve, reject) => {
      sql.query("DELETE FROM token WHERE token = ?", token, (res, err) => {
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
