const Movie = require('../models/Movie');

const createMovie = async (req, res)=>{
    //metodo para asociar pelicula a usuario

    const {title,description,release_year,user_id}= req.body; //se extrae informacion del body del request

    try {
        //try catch para manejo de solicitud y error
        const existingMovie = await Movie.findByTitleAndUser(title,user_id); //se verifica si ya existe pelicula
        if (existingMovie){
            return res.status(400).json({err:'Ya existe peliucla para el usuario'});//si pelicula ya existe se envia mensaje al servidor
        }
        const movieId = await Movie.create(title,description,release_year,user_id); //se usa el metodo create del modelo para incluir la pelicula
        res.status(201).json({id: movieId,title,description,release_year,user_id})//respuesta de servidor cuando se crea correctamente
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la película' });//manejo de error
    }
};

const getMoviesByUser = async (req, res )=>{
    //meotod para obtener las peliculas asociadas a un usuario
    const{userid}=req.params; //se extrae userid de params

    try {
        const movies = await Movie.findByUser(userid); //se usa el metodo del modelo para obtener las peliculas dekl usuario
        if (!movies || movies.length === 0) {
            return res.status(404).json({ error: 'No se encontraron películas para este usuario' }); //se valida si es 0 se envia respuesta del servidor
          }
          res.status(200).json(movies);  //se envia las movies asociadas
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener las películas' });
        }
      };

const deleteMovie = async (req,res)=>{
    //eliminar una pelicula especifica
    const{movie_id}=req.params;//se extrae el id de la pelicula de params

    try {
        await Movie.deleteById(movie_id); //se usa metodo del modelo
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error:'no se puedo eliminar la pelicula'});
    }
};

module.exports = {createMovie, getMoviesByUser, deleteMovie};