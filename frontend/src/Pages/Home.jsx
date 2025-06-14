import { useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieCards from "../components/MovieCard";
import { TailSpin } from "react-loader-spinner";
import SearchBar from "../components/SearchBar";
import CategorySelector from "../components/CategorySelector";
import Footer from "../components/Footer";
import DailyMovie from "../components/DailyMovie";
import CelebrityCarousel from "../components/CelebrityCard";
import MovieReviews from "../components/MovieReviews";

const Home = () => {
  const [category, setCategory] = useState("popular");
  const { movies, loading, error } = useMovies(category);

  return (
    <div className="pt-20 flex flex-col min-h-screen bg-gradient-to-b from-slate-100 to-gray-200 text-gray-800">
      <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 md:px-10 py-10 space-y-20">
        
        {/* HERO */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Bienvenido a CineDB
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Tu plataforma favorita para explorar películas y series.
          </p>
        </section>

        {/* BUSCADOR Y CATEGORÍAS */}
        <div className="space-y-6">
          <SearchBar />
          <CategorySelector category={category} setCategory={setCategory} />
        </div>

        {/* MOVIE CARDS con contenedor para alinear flechas externas */}
        <section>
          {loading ? (
    <div className="flex justify-center items-center h-48">
      <TailSpin color="#00BFFF" height={50} width={50} />
    </div>
  ) : error ? (
    <p className="text-red-500 text-center">
      Hubo un error al cargar las películas.
    </p>
  ) : (
    <MovieCards movies={movies} />
  )}
        </section>

        {/* RECOMENDACIÓN DEL DÍA */}
        <section>
          <DailyMovie />
        </section>

        {/* CELEBRIDADES */}
        <section>
          <CelebrityCarousel />
        </section>

        {/* RESEÑAS */}
        <section>
          <MovieReviews />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;