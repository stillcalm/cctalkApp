const sql = require("./db.js");

class Message {
  constructor(message) {
    this.message = message;
  }

  static getAllMessages(result) {
    sql.query("SELECT * FROM messages", (err, res) => {
      if (err) {}
    });
  }
}
