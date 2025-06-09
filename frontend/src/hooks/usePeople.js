import { useState, useEffect } from "react";
import axios from "axios";


const usePeople = (page) => {
  const BaseURL = "https://api.themoviedb.org/3/person/popular";
  const apiUrl = import.meta.env.VITE_MOVIE_API_KEY;

  const [people, setPeople] = useState([]); // Estado para almacenar las películas
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState(null); // Estado para manejar errores

  const options = {
    params: {
      language: "en-US",
      page: page,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiUrl}`,
    },
  };

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true); // Activar el estado de loading
        const response = await axios.get(`${BaseURL}`, options);
        setPeople(response.data.results); // Guardar las personas
        setError(null); // Limpiar errores
      } catch (error) {
        setError("Error al obtener las personas"); // Guardar el error
        console.error("Error fetching people:", error);
      } finally {
        setLoading(false); // Desactivar el estado de loading
      }
    };

    fetchPeople(); // Llamar a la función para obtener las películas
  }, [page]); // Ejecutar cuando cambie la categoría

  return { people, loading, error }; // Devolver los estados
};

export default usePeople;