const sql = require("./db.js");

class Message {
  static storeMessage(mes) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO messages (mes_uuid, chat_uuid, sender_uuid, receiver_uuid, content) VALUES (?,?,?,?,?)",
        [
          mes.mes_uuid,
          mes.chat_uuid,
          mes.sender_uuid,
          mes.receiver_uuid,
          mes.content,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          }
          if (res) {
            resolve(res);
          }
          reject("No message sended");
        }
      );
    });
  }

  static getHistoryMesByChatUuid(uuid) {
    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT mes_uuid, chat_uuid, sender_uuid, receiver_uuid, content, created_at FROM messages WHERE chat_uuid = ? ORDER BY created_at DESC LIMIT 50",
        [uuid],
        (err, res) => {
          if (err) {
            console.log("error: ");
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
}

module.exports = Message;
