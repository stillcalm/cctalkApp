const sql = require("./db.js");

class Test {
  constructor(name, password_hash, email) {
    this.name = name;
    this.password_hash = password_hash;
    this.email = email;
  }

  static create(newTest, result) {
    sql.query("INSERT INTO test SET ?", newTest, (err, res) => {
      console.log(newTest);
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created test: ", { id: res.insertId, ...newTest });
      result(null, { id: res.insertId, ...newTest });
    });
  }

  static findById(id, result) {
    sql.query(`SELECT * FROM test WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found test: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Test with the id
      result({ kind: "not_found" }, null);
    });
  }

  static remove(id, result) {
    sql.query("DELETE FROM test WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Test with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted test with id: ", id);
      result(null, res);
    });
  }
}

module.exports = Test;
