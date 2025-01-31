const express = require('express');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const db = require('./config/db');
const User = require('./models/User');
const Movie = require('./models/Movie');

const app = express();

app.use(express.json());

User.createTable();
Movie.createTable();

app.use('/api/user',userRoutes);
app.use('/api/movie', movieRoutes);

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({error:'Error en el servidor'});
})


module.exports = app;