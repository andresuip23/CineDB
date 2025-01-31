const db = require("../config/db");

class Movie {
  static createTable() {
    //sql para crear tabla si no existe
    const sql = `
            CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                release_year INTEGER,
                user_id INTEGER,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        `;
    return db.run(sql); //metodo para correr sql en la base de datos
  }

  static create(title, description, release_year, user_id) {
    //metodo para crear pelicula a usuario
    const sql =
      "INSERT INTO movies ( title, description, release_year, user_id ) VALUES (?, ?, ?, ?)";
    return db.run(sql, [title, description, release_year, user_id]);
  }

  static findByUser(userId) { //metodo para encontrar las peliculas asociadas a un usuario
    const sql = "SELECT * FROM movies WHERE user_id = ?";
    return new Promise((resolve, reject) => { //promesa para validar informacion 
      db.all(sql, [userId], (err, rows) => {
        if (err) {
          reject(err);  
          resolve(rows || []);  
        }
      });
    });
  }

  static findById(id) { //metodo para encontrar pelicula en especifico
    const sql = "SELECT * FROM movies WHERE id = ?";
    return new Promise ((resolve,reject)=>{ //promesa para menejo de solicitud
      db.all(sql,[id],(err,rows)=>{
        if(err){
          reject(err);
        }else{
          resolve(rows || null);
        }
      });
    });
  }

  static deleteById(id) {//metodo para eliminar pelicula de usuario
    const sql = "DELETE FROM movies WHERE id = ?";
    return db.run(sql, [id]);
  }

  static findByTitleAndUser(title, user_id) { //metodo para encontrar peliucla por el titulo y usuario
    const sql = `SELECT * FROM movies WHERE title = ? AND user_id = ?`;
    return new Promise((resolve,reject)=>{ //promesa para manejo de solicitud
      db.get(sql,[title,user_id],(err,row)=>{
        if(err){
          reject(err);
        }else{
          resolve(row || null);
        }
      })
    })
}
}

module.exports = Movie;
