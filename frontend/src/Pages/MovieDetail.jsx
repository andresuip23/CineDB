import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaStar, FaFilm, FaClock } from "react-icons/fa";
import axios from "axios";
import useRecommendation from "../hooks/useRecommendation";
import useTrailer from "../hooks/useTrailer";
import useProviders from "../hooks/useProviders";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
  const { recommendations } = useRecommendation(id);
  const { trailer } = useTrailer(id);
  const { providers } = useProviders(id);
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
    <div className="bg-gradient-to-b from-slate-100 to-gray-200 min-h-screen pt-32 py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Imagen de la película */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-64 h-auto rounded-xl shadow-md"
          />
        </div>

        {/* Información */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {movie.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-indigo-600" />
              {movie.release_date}
            </span>
            {movie.runtime && (
              <span className="flex items-center gap-1">
                <FaClock className="text-pink-500" />
                {movie.runtime} min
              </span>
            )}
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              {movie.vote_average.toFixed(1)} / 10
            </span>
            <span className="flex items-center gap-1">
              <FaFilm className="text-green-500" />
              {movie.original_language.toUpperCase()}
            </span>
          </div>

          {/* Géneros */}
          <div className="flex flex-wrap gap-2 mt-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Descripción */}
          <p className="text-gray-700 text-base leading-relaxed">
            {movie.overview || "Sin descripción disponible."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
