const sql = require("./db.js");

class Token {
  constructor(token) {
    this.token = token;
  }

  // 创建token
  static create(token) {
    return sql.query("INSERT INTO token SET ?", token);
  }

  // 获取token
  static get() {
    return sql.query("SELECT * FROM token WHERE uuid = ?", this.token);
  }

  // 更新token
  static update() {
    return sql.query("UPDATE token SET ? WHERE uuid = ?", [this, this.token]);
  }
  // 验证token
  static verify(uuid, token) {
    return sql.query("SELECT * FROM token WHERE uuid = ? AND token= ?", [
      uuid,
      token,
    ]);
  }
  // 删除token
  static delete() {
    return sql.query("DELETE FROM token WHERE token = ?", this.token);
  }
}
