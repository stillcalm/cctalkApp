const sql = require("./db.js");

class Chats {
  static addChatsByUUID(chat_uuid) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO chats_list (chat_uuid) VALUES (?)",
        chat_uuid,
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            reject(err);
            return;
          }
          if (res.affectedRows == 0) {
            reject({ kind: "not_found" }); // 如果没有影响的行（即未添加成功），拒绝Promise
            return;
          }
          resolve(chat_uuid);
          return;
        }
      );
    });
  }

  static getChatByUUIDs(chat_uuid) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT * FROM chats_list WHERE chat_uuid = ?",
        chat_uuid,
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            reject(err);
            return;
          }
          if (res.length == 0) {
            reject({ kind: "not_found" }); // 如果没有影响的行（即未添加成功），拒绝Promise
            return;
          }
          resolve(chat_uuid);
          return;
        }
      );
    });
  }

  static updateChatStatusByUUID(status, chat_uuid) {
    return new Promise((resolve, reject) => {
      sql.query(
        "UPDATE chats_list SET status = ? WHERE chat_uuid = ?",
        [status, chat_uuid],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            reject(err);
            return;
          }
          if (res.affectedRows == 0) {
            reject({ kind: "not_found" }); // 如果没有影响的行（即未添加成功），拒绝Promise
            return;
          }
          resolve();
          return;
        }
      );
    });
  }
}

module.exports = Chats;
