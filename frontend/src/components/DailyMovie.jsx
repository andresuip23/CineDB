import { useEffect, useState } from "react";
import axios from "axios";


export default function DailyRecommendation() {
  const [movie, setMovie] = useState([]);
  const apiUrl = import.meta.env.VITE_MOVIE_API_KEY;

  const options = {
    params: {
      language: "en-US",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiUrl}`,
    },
  };


  useEffect(() => {
    const fetchTrendingMovie = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day`,options);
        // Escogemos la primera película como recomendación del día
        setMovie(res.data.results[0]);
      } catch (error) {
        console.error("Error fetching trending movie", error);
      }
    };

    fetchTrendingMovie();
    console.log(movie)
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-8 p-4 flex flex-col md:flex-row gap-6">
    {/* Imagen */}
    <div className="w-full md:w-1/2 h-64 md:h-auto">
      <img
        src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>

    {/* Info */}
    <div className="w-full md:w-1/2 flex flex-col justify-between">
      {/* Etiqueta */}
      <span className="text-blue-600 font-semibold text-sm uppercase mb-2">
        🎬 Recomendación del día
      </span>

      {/* Título */}
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{movie.title}</h2>

      {/* Descripción */}
      <p className="text-gray-700 text-sm md:text-base line-clamp-5 mb-4">
        {movie.overview || "Sin descripción disponible."}
      </p>

      {/* Rating */}
      {movie.vote_average && (
        <span className="inline-block px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold self-start">
          ⭐ {movie.vote_average.toFixed(1)} / 10
        </span>
      )}
    </div>
  </div>
);
}