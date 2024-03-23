const sql = require("./db.js");
const { v4: uuid_v4 } = require("uuid");

class User {
  constructor(username, password_hash, email) {
    this.uuid = uuid_v4();
    this.username = username;
    this.password_hash = password_hash;
    this.email = email;
    this.phone_number = "";
    this.avatar_url = "https://i.imgur.com/Qr71crq.jpg";
    this.nickname = "默认用户";
    this.gender = "Male";
    this.birthday = "2000-01-01";
    this.status = "offline";
  }
  static create(newUser, result) {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
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

  static login(username, password_hash, result) {
    sql.query(
      `SELECT * FROM users WHERE username = "${username}" AND password_hash = "${password_hash}"`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          result(null, res[0]);
          return;
        }
      }
    );
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
      result({ kind: "not_found" }, null);
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
