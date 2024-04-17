const sql = require("./db.js");
const { v4: uuid_v4 } = require("uuid");

class User {
  constructor(username, password_hash, email) {
    this.uuid = uuid_v4();
    this.username = username;
    this.password_hash = password_hash;
    this.email = email;
    this.phone_number = "";
    this.avatar_url = "";
    this.nickname = "默认用户";
    this.gender = "Male";
    this.birthday = "2000-01-01";
    this.status = "offline";
  }
  static create(newUser) {
    return new Promise((resolve, reject) => {
      sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
          console.log("error: ", err);
          reject(err);
          return;
        }
        if (res.affectedRows == 0) {
          reject("not_found");
          return;
        }
        console.log(res);
        resolve(res);
        return;
      });
    });
  }

  static login(username, password_hash) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT * FROM users WHERE username = ? AND password_hash = ?",
        [username, password_hash],
        (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          if (res.length) {
            console;
            resolve(res[0]);
            return;
          }
          reject("not_found");
          return;
        }
      );
    });
  }

  static updateUserInfo(uuid, user, result) {
    sql.query("UPDATE users SET ? WHERE uuid = ?", [user, uuid], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, res);
    });
  }

  static findByUUId(uuid, result) {
    sql.query("SELECT * FROM users WHERE uuid = ?", uuid, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      // not found
      return result({ kind: "not_found" }, null);
    });
  }

  static findByUUIds(uuidList) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(uuidList)) {
        uuidList = [uuidList];
      }

      const placeholders = uuidList.map(() => "?").join(", ");
      const sqlQuery = `SELECT uuid, username, nickname, avatar_url, signature FROM users WHERE uuid IN (${placeholders})`;
      sql.query(sqlQuery, uuidList, (err, res) => {
        if (err) {
          reject(err);
        } else if (res.length > 0) {
          resolve(res);
        } else {
          reject({ kind: "not_found" });
        }
        reject({ kind: "not_found" });
      });
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT * FROM users WHERE username = ?",
        username,
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            reject(err); // 如果发生错误，拒绝Promise
            return;
          }

          if (res.length) {
            resolve(res[0]); // 如果找到用户，解析Promise
            return;
          }
          reject({ kind: "not_found" }); // 如果未找到用户，拒绝Promise
          return;
        }
      );
    });
  }

  static removeByUUId(uuid, result) {
    sql.query("DELETE FROM users WHERE uuid = ?", uuid, (err, res) => {
      if (err) {
        console.log("error: ", err);
      }
      console.log(res);
      console.log(res.affectedRows);
      if (res.affectedRows == 0) {
        // not found Test with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted test with id: ", uuid);
      result(null, res);
    });
  }
}

module.exports = User;
