import { useState, useEffect } from "react";
import axios from "axios";


const useMovies = (category) => {
  const BaseURL = "https://api.themoviedb.org/3/movie";
  const apiUrl = import.meta.env.VITE_MOVIE_API_KEY;

  const [movies, setMovies] = useState([]); // Estado para almacenar las películas
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState(null); // Estado para manejar errores

  const options = {
    params: {
      language: "en-US",
      page: 1,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiUrl}`,
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true); // Activar el estado de loading
        const response = await axios.get(`${BaseURL}/${category}`, options);
        setMovies(response.data.results); // Guardar las películas
        setError(null); // Limpiar errores
      } catch (error) {
        setError("Error al obtener las películas"); // Guardar el error
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); // Desactivar el estado de loading
      }
    };

    fetchMovies(); // Llamar a la función para obtener las películas
  }, [category]); // Ejecutar cuando cambie la categoría

  return { movies, loading, error }; // Devolver los estados
};

export default useMovies;