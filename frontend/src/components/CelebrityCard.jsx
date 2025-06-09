import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import usePeople from "../hooks/usePeople";

import "swiper/css";
import "swiper/css/navigation";

export default function CelebrityCarousel() {
  const {people, loading, error} = usePeople(1);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        🌟 Celebridades populares
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={2}
        navigation
        pagination={{clickable:true}}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="w-full"
      >
        {people.map((celebrity) => (
          <SwiperSlide key={celebrity.id} className="">
            <div className="bg-white rounded-xl shadow-md p-4 text-center h-full mb-14">
              <img
                src={`https://image.tmdb.org/t/p/w185${celebrity.profile_path}`}
                alt={celebrity.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-2"
              />
              <h3 className="text-md font-semibold">{celebrity.name}</h3>
              <p className="text-sm text-gray-500">
                {celebrity.known_for_department}
              </p>
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
                Popularidad: {celebrity.popularity.toFixed(0)}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}