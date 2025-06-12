import useMovies from "../hooks/useMovies";
import ReviewCards from "../components/ReviewCards";

export default function RecentMovieReviews() {
  const { movies, loading } = useMovies("popular");

  if (loading) return <p>Cargando películas recientes...</p>;

  return (
    <div className="space-y-8 flex justify-center items-center mt-8">
      {movies.slice(1, 3).map((movie) => (
        <div key={movie.id} className="h-full w-full flex justify-center">
          <div className="w-60 h-80 self-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover m-4"
          />
          </div>
          <ReviewCards movieId={movie.id} />
        </div>
      ))}
    </div>
  );
}