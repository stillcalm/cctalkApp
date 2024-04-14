const sql = require("./db.js");

class Friend {
  static addFriendByUUID(user1_uuid, user2_uuid, chat_uuid) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO friend_relations (user1_uuid, user2_uuid, status, friend_uuid) VALUES (?, ?, ?, ?)",
        [user1_uuid, user2_uuid, "pending", chat_uuid],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            reject(err); // 如果发生错误，拒绝Promise
            return;
          }

          if (res.affectedRows == 0) {
            reject(chat_uuid); // 如果没有影响的行（即未添加成功），拒绝Promise
            return;
          }

          resolve(); // 如果添加成功，解析Promise
          return;
        }
      );
    });
  }

  static getFriendsByUUID(user_uuid, result) {
    sql.query(
      "SELECT * FROM friend_relations WHERE user1_uuid = ? OR user2_uuid = ?",
      [user_uuid, user_uuid],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          return result(err, null);
        }
        if (res.length) {
          return result(null, res);
        }
      }
    );
  }
}

module.exports = Friend;
