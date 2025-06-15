import axios from "axios";
import { useEffect, useState } from "react";

const useRecommendation = (movieId) => {
  const apiUrl = import.meta.env.VITE_MOVIE_API_KEY;
  const [recommendations, setRecommendations] = useState([]); // Estado para almacenar las películas
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState(null); // Estado para manejar errores
  const options = {
    params: {
      language: "es-US",
      page: 1,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiUrl}`,
    },
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`,options);
        setRecommendations(response.data.results);
        setError(null);
      } catch (error) {
        setError("Error al obtener las películas"); // Guardar el error
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [movieId]);

  return { recommendations, loading, error };
};

export default useRecommendation;
