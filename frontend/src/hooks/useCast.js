import axios from "axios";
import { useEffect, useState } from "react";

const useCast = (movieId) => {
  const apiUrl = import.meta.env.VITE_MOVIE_API_KEY;

  const [cast, setCast] = useState([]); // Estado para almacenar las películas
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState(null); // Estado para manejar errores

  const options = {
    params: {
         language: "en-US"
         },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiUrl}`,
    },
  };

  useEffect(()=>{

    const FetchCast= async ()=>{

        try {
            const response= await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`,options);
            setCast(response.data);
            setError(null);
        } catch (error) {
            setError("Error al obtener las películas"); // Guardar el error
            console.error("Error fetching movies:", error);
        }finally{
          setLoading(false);
        }

    }

    
    FetchCast();
   
  },[movieId])

 console.log(cast);

return {cast,loading,error};

};

export default useCast;