import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaStar,
  FaFilm,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";
import axios from "axios";
import MovieTrailer from "../components/MovieTrailer";
import { MovieCrew } from "../components/Moviecrew";
import MovieCast from "../components/MovieCast";
import MovieProviders from "../components/MovieProviders";
import MovieRecommendations from "../components/MovieRecommendations";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
  const options = {
    params: {
      language: "en-US",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          options
        );
        setMovie(res.data);
      } catch (error) {
        console.error("Error al obtener detalles de la película:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="text-center text-gray-600 py-10">
        Cargando detalles...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-100 to-gray-200 min-h-screen pt-32 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Columna Izquierda: Imagen + Datos */}
        <div className="col-span-1 flex flex-col items-center md:items-start">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-64 h-auto rounded-xl shadow-md mb-6"
          />

          <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left mb-4">
            {movie.title}
          </h1>

          <div className="space-y-2 text-sm text-gray-600 w-full">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-indigo-600" />
              <span>{movie.release_date}</span>
            </div>
            {movie.runtime && (
              <div className="flex items-center gap-2">
                <FaClock className="text-pink-500" />
                <span>{movie.runtime} min</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <span>{movie.vote_average.toFixed(1)} / 10</span>
            </div>
            <div className="flex items-center gap-2">
              <FaFilm className="text-green-500" />
              <span>{movie.original_language.toUpperCase()}</span>
            </div>
          </div>

          {/* Géneros */}
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <MovieCrew movieId={id}/>
          <MovieProviders movieId={id}/>
        </div>

        {/* Columna Derecha: Trailer + Sinopsis */}
        <div className="col-span-2 flex flex-col gap-6 justify-start">
          {/* Tráiler (componente) */}
          <MovieTrailer movieId={id} />

          {/* Sinopsis mejorada */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center gap-2 bg-gray-400 rounded-md p-2 text-white">
              <FaInfoCircle className="text-white" />
              Sinopsis
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {movie.overview ||
                "Sin descripción disponible para esta película en este momento."}
            </p>
          </div>
          <MovieCast movieId={id}/>
          <MovieRecommendations movieId={id}/>
        </div>
        
      </div>
      
    </div>
  );
};

export default MovieDetail;
