import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import usePeople from "../hooks/usePeople";

import "swiper/css";
import "swiper/css/navigation";

import { HiChevronLeft, HiChevronRight, HiStar } from "react-icons/hi";

export default function CelebrityCarousel() {
  const { people, loading, error } = usePeople(1);
  const swiperRef = useRef(null);

  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-4">Cargando celebridades...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-4">Error al cargar celebridades.</p>;
  }

  return (
    <div className="relative w-full py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2 bg-gray-400 rounded-md p-2 text-white">
          <HiStar className="text-yellow-500" size={28} />
          Celebridades populares
        </h2>

        {/* Flechas externas */}
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
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="w-full pb-10"
        >
          {people.map((celebrity) => (
            <SwiperSlide key={celebrity.id}>
              <div className="bg-white rounded-xl shadow-md p-4 text-center h-full mb-12">
                <img
                  src={`https://image.tmdb.org/t/p/w185${celebrity.profile_path}`}
                  alt={celebrity.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-2"
                />
                <h3 className="text-md font-semibold">{celebrity.name}</h3>
                <p className="text-sm text-gray-500">{celebrity.known_for_department}</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
                  Popularidad: {celebrity.popularity.toFixed(0)}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}