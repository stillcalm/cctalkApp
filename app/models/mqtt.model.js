const sql = require("./db.js");

class Mqtt {
  static login(uuid, password_hash) {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT username FROM users WHERE uuid = ? AND password_hash = ?`,
        [uuid, password_hash],
        (err, res) => {
          if (err) {
            console.error("error: ", err);
            reject(err);
            return;
          }
          if (res.length > 0) {
            console.log("Login successful for user:", res[0].username);
            resolve(true);
          } else {
            console.log("Login failed for uuid:", uuid);
            resolve(false);
          }
        }
      );
    });
  }
}

module.exports = Mqtt;
