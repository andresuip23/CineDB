const CategorySelector = ({ category, setCategory }) => {
    const categories = [
      { key: "popular", label: "Populares" },
      { key: "top_rated", label: "Mejor Valoradas" },
      { key: "upcoming", label: "Próximas" },
    ];
  
    return (
      <div className="flex justify-left space-x-4 bg-gray-400 p-2 rounded-md">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`px-4 py-2 rounded-md transition ${
              category === key
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    );
  };
  
  export default CategorySelector;