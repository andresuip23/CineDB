import useTrailer from "../hooks/useTrailer";

const MovieTrailer = ({movieId}) => {

  const { trailer, loading, error } = useTrailer(movieId);

  const trailerVideo = trailer.find(
  (v) =>
    v.site === "YouTube" &&
    v.type === "Trailer" &&
    v.official === true
) || trailer.find((v) => v.site === "YouTube");

  if (loading) return <p className="text-center mt-4">Cargando tráiler...</p>;
  if (error || !trailer)
    return (
      <p className="text-center mt-4 text-gray-500 italic">
        No hay tráiler disponible.
      </p>
    );

  return (
     <div className="w-full">
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${trailerVideo.key}`}
          title={trailerVideo.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default MovieTrailer;