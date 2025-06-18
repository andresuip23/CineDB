import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import useCast from "../hooks/useCast";

import "swiper/css";
import "swiper/css/navigation";

import { HiChevronLeft, HiChevronRight, HiUserGroup } from "react-icons/hi";

export default function MovieCast({ movieId }) {
 const { cast, loading, error } = useCast(movieId);
  const swiperRef = useRef(null);

  const handlePrev = () => swiperRef.current?.swiper.slidePrev();
  const handleNext = () => swiperRef.current?.swiper.slideNext();

  if (loading) return <p className="text-center text-gray-500 mt-4">Cargando reparto...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">Error al cargar reparto.</p>;

  return (
    <div className="relative w-full py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <HiUserGroup className="text-blue-500" size={28} />
          Reparto Principal
        </h2>

        {/* Flechas externas */}
        <button
          onClick={handlePrev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow-md transition"
        >
          <HiChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow-md transition"
        >
          <HiChevronRight size={24} />
        </button>

        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full pb-10"
        >
          {cast.cast.slice(0,10).map((actor) => (
            <SwiperSlide key={actor.cast_id || actor.id}>
              <div className="bg-white rounded-xl shadow-md p-4 text-center h-full flex flex-col items-center min-h-[180px]">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "/placeholder-user.png"
                  }
                  alt={actor.name}
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
                <h3 className="text-sm font-semibold line-clamp-1">{actor.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {actor.character || "Sin personaje"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}