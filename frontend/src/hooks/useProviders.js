import axios from "axios";
import { useEffect, useState } from "react";

const useProviders = (movieId)=>{

    const apiUrl = import.meta.env.VITE_MOVIE_API_KEY;
    const [providers, setProviders] = useState([]); // Estado para almacenar las películas
    const [loading, setLoading] = useState(true); // Estado para manejar el loading
    const [error, setError] = useState(null); // Estado para manejar errores
    
    const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiUrl}`,
    },
  };

  useEffect(()=>{

    const fetchProviders = async ()=>{
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,options);
            setProviders(response.data.results);
            setError(null);
        } catch (error) {
            setError("Error al obtener las películas"); // Guardar el error
            console.error("Error fetching movies:", error);
        }finally{
            setLoading(false);
        }
    }

    fetchProviders();
  },[movieId]);

  return {providers,loading,error};

}

export default useProviders;