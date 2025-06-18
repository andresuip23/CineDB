import useProviders from "../hooks/useProviders";

const MovieProviders = ({ movieId }) => {
  const { providers, loading, error } = useProviders(movieId);

  // Puedes cambiar "US" por "PA" si deseas los proveedores de Panamá
  const providerList = providers?.US?.flatrate || [];

  if (loading) return <p className="text-center text-gray-500 mt-4">Cargando proveedores...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">Error al cargar los proveedores.</p>;
  if (!providerList.length) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Disponible en:</h3>
      <div className="flex flex-wrap gap-4">
        {providerList.map((provider) => (
          <div key={provider.provider_id} className="w-12 h-12">
            <img
              src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
              alt={provider.provider_name}
              className="w-full h-full object-contain rounded"
              title={provider.provider_name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieProviders;