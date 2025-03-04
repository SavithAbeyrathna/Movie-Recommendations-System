import React from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard"; // Import MovieCard component
import actorsData from "../../data/actors.json"; // Import actors JSON

const ActorPage = () => {
  const { actorId } = useParams(); // Get actor ID from URL
  const actor = actorsData.find((a) => a.id === actorId); // Find actor from JSON data

  if (!actor) {
    return <h1 className="text-white text-center mt-10">Actor Not Found</h1>;
  }

  return (
    <div className="bg-black min-h-screen text-white p-20">
      <h1 className="text-4xl font-bold text-center">
        BEST MOVIES OF <span className="text-red-500 uppercase">{actor.name}</span>
      </h1>

      <p className="text-center text-gray-400 mt-2">
        Can't decide? <span className="text-red-500 cursor-pointer">Use Movie Picker!</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {actor.movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            title={movie.title} 
            image={movie.poster_path.startsWith("http") 
              ? movie.poster_path // If full URL, use it directly
              : `https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Add TMDB base URL
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        <button className="border border-gray-400 px-4 py-2 rounded">1</button>
        <button className="border border-gray-400 px-4 py-2 rounded">2</button>
        <button className="border border-gray-400 px-4 py-2 rounded">3</button>
        <button className="border border-gray-400 px-4 py-2 rounded">...</button>
        <button className="border border-gray-400 px-4 py-2 rounded">10</button>
        <button className="border border-gray-400 px-4 py-2 rounded bg-red-500">
          Next &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default ActorPage;
