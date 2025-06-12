import useReviews from "../hooks/useReview";

export default function MovieReviews({ movieId }) {
  const { reviews, loading } = useReviews(movieId);

  if (loading) return <p>Cargando críticas...</p>;

  return (
    <div className="space-y-4 mt-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">📝 Críticas</h2>
      {reviews.slice(0, 3).map((review) => (
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