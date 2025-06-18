import React from "react";
import useCast from "../hooks/useCast";

export function MovieCrew({ movieId }) {
  const { cast, loading, error } = useCast(movieId);

  if (loading) return <p className="text-gray-500">Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Filtrar crew
  const director = cast.crew?.find((p) => p.job === "Director");
  const writer = cast.crew?.find((p) => p.job === "Writer" || p.job === "Screenplay");
  const producer = cast.crew?.find((p) => p.job === "Producer");

  return (
    <div className="pt-8">
      <h3 className="text-xl font-semibold text-white mb-4 bg-gray-400 rounded-md p-2 w-max">Equipo Creativo</h3>
      <ul className="space-y-2 text-gray-700">
        {director && <li><strong>Director:</strong> {director.name}</li>}
        {writer && <li><strong>Escritor:</strong> {writer.name}</li>}
        {producer && <li><strong>Productor:</strong> {producer.name}</li>}
        {!director && !writer && !producer && <li>No hay información disponible.</li>}
      </ul>
    </div>
  );
}