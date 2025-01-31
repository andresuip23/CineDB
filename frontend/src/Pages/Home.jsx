import { useState, useEffect } from "react";
import useMovies from '../hooks/useMovies'
import MovieCards from "../components/MovieCard";

const Home = () => {
    const [category, setCategory]=useState('popular');
    const {movies,loading,error}=useMovies(category);

    console.log(movies);

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
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setCategory("popular")}
              className={`px-4 py-2 rounded-md ${
                category === "popular"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Populares
            </button>
            <button
              onClick={() => setCategory("top_rated")}
              className={`px-4 py-2 rounded-md ${
                category === "top_rated"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Mejor Valoradas
            </button>
            <button
              onClick={() => setCategory("upcoming")}
              className={`px-4 py-2 rounded-md ${
                category === "upcoming"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Próximas
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCards movie={movie}/>
        ))}
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
