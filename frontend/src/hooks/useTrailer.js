import { useEffect,useState } from "react";
import axios from "axios";

const useTrailer = (movieId)=>{

    const apiUrl = import.meta.env.VITE_MOVIE_API_KEY;
        const [trailer, setTrailer] = useState([]); // Estado para almacenar las películas
        const [loading, setLoading] = useState(true); // Estado para manejar el loading
        const [error, setError] = useState(null); // Estado para manejar errores
        
        const options = {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiUrl}`,
        },
      };
      
        useEffect(()=>{

    const fetchTrailer = async ()=>{
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`,options  )
            setTrailer(response.data.results);
            setError(null);
        } catch (error) {
            setError("Error al obtener las películas"); // Guardar el error
            console.error("Error fetching movies:", error);
        }finally{
            setLoading(false);
        }
    }

    fetchTrailer();

  },[movieId])

return {trailer,loading,error};


}

export default useTrailer;