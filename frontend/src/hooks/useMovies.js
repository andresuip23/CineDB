import { useState, useEffect } from "react";
import axios from "axios";

const useMovies = (category) => {
  const BaseURL = "https://api.themoviedb.org/3/movie";
  const APIKEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDE0YzNmMjkwNzY4MzY4ZGE2YTkwMzY1OThhZmE4NyIsIm5iZiI6MTczODM1NTQzMi4zNDYsInN1YiI6IjY3OWQzMmU4MTc2ZmRiMjI0NGNiMmEyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k-_A5sNXErIQlFNOA1OZCSmqcNHLg7JXtTh8dopCYXo";

  const [movies, setMovies] = useState([]); // Estado para almacenar las películas
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState(null); // Estado para manejar errores

  const options = {
    params: {
      language: "es-US",
      page: 1,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${APIKEY}`,
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