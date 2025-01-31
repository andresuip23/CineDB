const sqlite3 = require('sqlite3'); // se importa sqlite
const path = require('path');

const dbPath = '/home/andresprog/IMDBdub/database.sqlite'; //se defino el path de la base de datos
console.log('Conectando a la base de datos en:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    //se crea la base de datos
    if (err) {
        //manejo de errores
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos');
    }
});

module.exports = db;