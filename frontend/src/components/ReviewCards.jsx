import useReviews from "../hooks/useReview";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function MovieReviews({ movieId }) {
  const { reviews, loading } = useReviews(movieId);

  if (loading)
    return <p className="text-center text-gray-600 mt-4">Cargando críticas...</p>;

  if (!reviews || reviews.length === 0)
    return (
      <div className="flex items-center gap-2 text-gray-500 italic mt-4">
        <AiOutlineInfoCircle size={20} />
        <span>No hay reseñas disponibles para esta película.</span>
      </div>
    );

  return (
    <div className="space-y-4  max-w-4xl mx-auto">
      {reviews.slice(0, 2).map((review) => (
        <div
          key={review.id}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
        >
          <p className="text-gray-700 italic">"{review.content.slice(0, 300)}..."</p>
          <div className="mt-2 text-sm text-gray-500">
            Por <strong>{review.author}</strong> el{" "}
            {new Date(review.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}