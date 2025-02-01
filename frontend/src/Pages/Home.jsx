import { useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieCards from "../components/MovieCard";
import { TailSpin } from "react-loader-spinner";

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
          {/* botnes*/}
          <div className="flex justify-left space-x-4 mb-8 bg-gray-400">
            <button
              onClick={() => setCategory("popular")}
              className={`px-4 py-2 rounded-md ${
                category === "popular"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              Populares
            </button>
            <button
              onClick={() => setCategory("top_rated")}
              className={`px-4 py-2 rounded-md ${
                category === "top_rated"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              Mejor Valoradas
            </button>
            <button
              onClick={() => setCategory("upcoming")}
              className={`px-4 py-2 rounded-md ${
                category === "upcoming"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              Próximas
            </button>
          </div>

          {/*CARDS*/}
    
            <div className="grid  items-center">
            {loading ? (
              <TailSpin />
            ) : (
              <MovieCards movies={movies} key={movies.id} />
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} CineDB. Todos los derechos
            reservados.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Desarrollado con ❤️ por [Tu Nombre]
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
