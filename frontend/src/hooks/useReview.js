import { useEffect, useState } from "react";

export default function useReviews(movieId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_MOVIE_API_KEY;

  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiUrl}`,
    },
  };

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews`,options);
        const data = await res.json();
        setReviews(data.results);
      } catch (error) {
        console.error("Error al cargar críticas:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [movieId]);

  return { reviews, loading };

}