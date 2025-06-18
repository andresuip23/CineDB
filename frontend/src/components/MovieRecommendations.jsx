import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import useRecommendation from "../hooks/useRecommendation";

import "swiper/css";
import "swiper/css/navigation";

const MovieRecommendations = ({ movieId }) => {
  const { recommendations, loading, error } = useRecommendation(movieId);
  const swiperRef = useRef(null);

  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  if (loading) return <p className="text-center text-gray-500 mt-4">Cargando recomendaciones...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;
  if (!recommendations.length) return null;

  return (
    <div className="relative w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">🎞️ Recomendaciones</h2>

        <button
          onClick={handlePrev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow-md transition"
          aria-label="Anterior"
        >
          <HiChevronLeft size={28} />
        </button>

        <button
          onClick={handleNext}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow-md transition"
          aria-label="Siguiente"
        >
          <HiChevronRight size={28} />
        </button>

        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full pb-10"
        >
          {recommendations.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="block bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-2 text-center">
                  <h3 className="text-sm font-semibold text-gray-800 truncate">{movie.title}</h3>
                  <p className="text-xs text-gray-500">{movie.release_date}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieRecommendations;