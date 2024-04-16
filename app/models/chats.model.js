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

  static getChatByUUIDs(uuidList) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(uuidList)) {
        uuidList = [uuidList];
      }

      const placeholders = uuidList.map(() => "?").join(",");
      const sqlQuery = `SELECT chat_uuid, status, last_message_uuid FROM chats_list WHERE chat_uuid IN (${placeholders})`;
      sql.query(sqlQuery, uuidList, (err, results) => {
        if (err) {
          reject(err);
        } else {
          // 将结果按UUID排序，以便与原始UUID数组的顺序匹配（如果需要）
          const chatMap = {};
          results.forEach((result) => {
            if (result.status === "confirmed") {
              chatMap[result.chat_uuid] = result;
            }
          });
          const sortedChats = uuidList.map((uuid) => chatMap[uuid] || null);
          resolve(sortedChats);
        }
      });
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
