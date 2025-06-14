import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const MovieCards = ({ movies }) => {
  const swiperRef = useRef(null);

  const slidePrev = () => swiperRef.current?.swiper.slidePrev();
  const slideNext = () => swiperRef.current?.swiper.slideNext();

  return (
    <div className="relative max-w-screen-xl mx-auto px-6 md:px-10">
      {/* Flechas absolutas para no cambiar layout */}
      <button
        onClick={slidePrev}
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md z-20"
        aria-label="Anterior"
      >
        <FiChevronLeft size={28} />
      </button>

      <button
        onClick={slideNext}
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md z-20"
        aria-label="Siguiente"
      >
        <FiChevronRight size={28} />
      </button>

      <Swiper
        ref={swiperRef}
        modules={[Pagination]}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        className="pb-10"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="flex justify-center">
            <div className="group relative w-[180px] h-[270px] rounded-xl overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105">
              <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3">
                <h3 className="text-white text-base font-semibold leading-tight mb-2 line-clamp-2">
                  {movie.title}
                </h3>
                
                <p className="text-green-300 text-sm font-medium">
                  ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
                </p>
              </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCards;