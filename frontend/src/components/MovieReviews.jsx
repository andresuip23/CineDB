import useMovies from "../hooks/useMovies";
import ReviewCards from "../components/ReviewCards";
import { MdRateReview } from "react-icons/md";

export default function RecentMovieReviews() {
  const { movies, loading, error } = useMovies("popular");

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-8">Cargando películas recientes...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-8">
        Error al cargar las películas recientes.
      </p>
    );

  const recentMovies = movies.slice(0, 2);

  return (
    <div className="mt-8 max-w-5xl mx-auto px-4">
      {/* Título con ícono */}
      <div className="flex items-center mb-8 gap-3 text-2xl font-semibold text-white bg-gray-400 p-4 rounded-md">
        <MdRateReview size={28} />
        <span>Reseñas recientes</span>
      </div>

      <div className="flex flex-col gap-10">
        {recentMovies.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col md:flex-row items-center md:items-start bg-white rounded-xl shadow-md p-6 gap-6"
          >
            {/* Imagen a la izquierda */}
            <div className="flex-shrink-0 w-[160px] h-[240px] rounded-md overflow-hidden shadow-md items-center">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover "
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 rounded-md">
                  Sin imagen
                </div>
              )}
            </div>

            {/* ReviewCards a la derecha ocupando todo el ancho restante */}
            <div className="flex-1 min-w-0">
              <ReviewCards movieId={movie.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}