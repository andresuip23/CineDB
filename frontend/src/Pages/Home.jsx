import { useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieCards from "../components/MovieCard";
import { TailSpin } from "react-loader-spinner";
import SearchBar from "../components/SearchBar";
import CategorySelector from "../components/CategorySelector";
import Footer from "../components/Footer";
import DailyMovie from "../components/DailyMovie";
import CelebrityCarousel from "../components/CelebrityCard";

const Home = () => {
  const [category, setCategory] = useState("popular");
  const { movies, loading, error } = useMovies(category);

  return (
    <div className="pt-20 flex flex-col min-h-screen bg-gray-200">
      {/* Contenido Principal */}
      <main className="flex-grow mx-auto px-4 py-8">
        <section className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Bienvenido a CineDB
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Tu plataforma favorita para explorar películas y series.
          </p>
          {/*SearchBar*/}
          <SearchBar />
          {/* botnes*/}
          <CategorySelector category={category} setCategory={setCategory} />
          {/*CARDS*/}
          <div className="grid  items-center">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <TailSpin color="#00BFFF" height={50} width={50} />
              </div>
            ) : (
              <MovieCards movies={movies} />
            )}
            {error && (
              <p className="text-red-500">
                Hubo un error al cargar las películas.
              </p>
            )}
          </div >
          <DailyMovie />
          {/*CeleibryCards*/}
          <div className="grid  items-center">
          <CelebrityCarousel />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
