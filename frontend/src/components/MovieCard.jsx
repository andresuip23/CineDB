import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MovieCards = ({ movies }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={0} // Pequeño espacio entre slides
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        320: { slidesPerView: 2 },  // Pantallas pequeñas (teléfonos)
        640: { slidesPerView: 3 },  // Tablets
        1024: { slidesPerView: 5 }, // Laptops
        1280: { slidesPerView: 8 }, // Pantallas grandes
      }}
      className="w-full h-[400px]"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id} className="flex justify-center items-center">
        <div className="group relative w-[200px] h-[300px] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay al hacer hover */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black/30 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
            <h3 className="text-white text-lg font-bold mb-2">{movie.title}</h3>
            <p className="text-gray-200 text-sm">
              ⭐ {movie.vote_average?.toFixed(1) ?? "Sin puntuación"}
            </p>
          </div>
        </div>
      </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieCards;