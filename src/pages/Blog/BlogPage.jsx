import { useState } from "react";
import MovieBlogCard from "../../components/MovieBlogCard/MovieBlogCard";
import moviesData from "../../Data/data.json"; // Import JSON file

const itemsPerPage = 4;

const BlogPage = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(moviesData.length / itemsPerPage);

  // Get movies for the current page
  const displayedMovies = moviesData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Pagination handlers
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="bg-black min-h-screen text-white py-10 px-4">
      <h1 className="text-4xl text-center font-bold mb-8 pt-10">Movie Blogs</h1>

      {/* Displaying Movie Blogs */}
      <div className="space-y-6">
        {displayedMovies.map((movie) => (
          <MovieBlogCard
            key={movie.id}
            title={movie.title}
            description={movie.overview}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            date={movie.release_date}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
