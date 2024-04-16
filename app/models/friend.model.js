const sql = require("./db.js");

class Friend {
  static addFriendByUUID(user1_uuid, user2_uuid, chat_uuid) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO friend_relations (user1_uuid, user2_uuid, user1_status, user2_status, friend_uuid) VALUES (?, ?, ?, ?, ?)",
        [user1_uuid, user2_uuid, "confirmed", "pending", chat_uuid],
        (err, res) => {
          if (err) {
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

  static updateFriendStatusByUUID(status, friend_uuid) {
    return new Promise((resolve, reject) => {
      sql.query(
        "UPDATE friend_relations SET user2_status = ? WHERE friend_uuid = ?",
        [status, friend_uuid ],
        (err, res) => {
          if (err) {
            console.error("Error updating friend status:", err);
            reject(err);
            return;
          }
          if (res.affectedRows == 0) {
            reject();
            return;
          }
          resolve();
          return;
        }
      );
    });
  }

  static getFriendsByUUID(user_uuid) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT user1_uuid, user2_uuid, friend_uuid, status FROM friend_relations WHERE user1_uuid = ? OR user2_uuid = ?",
        [user_uuid, user_uuid],
        (err, res) => {
          if (err) {
            console.error("Error fetching friends by UUID:", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  static getFriendsByUUIDAndStatus(user_uuid, status) {}
}

module.exports = Friend;
