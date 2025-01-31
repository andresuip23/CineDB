const MovieCards = ({movie}) => {
  return (
    <>
      <div className="w-60 h-90 text-sm">
          <div key={movie.id} className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {movie.title}
            </h2>
            <p className="text-gray-600 mt-2">
              {movie.release_date}
            </p>
          </div>
      </div>
    </>
  );
};

export default MovieCards;
