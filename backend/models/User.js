const db = require("../config/db");

class User {
  static createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            email TEXT UNIQUE
        )
    `;
    return db.run(sql);
  }

  static create(username, password, email) {
    const sql =
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
    return db.run(sql, [username, password, email]);
  }

  static async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
      db.get(sql, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || null); 
        }
      });
    });
  }

  static async findByUsername(username) {
    const sql = "SELECT * FROM users WHERE username = ?";
    return new Promise((resolve, reject) => {
      db.get(sql, [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || null); 
        }
      });
    });
  }
}


module.exports = User;
