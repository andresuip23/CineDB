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
          <div className="w-[200px] h-[300px] bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieCards;