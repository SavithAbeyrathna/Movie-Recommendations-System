import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import { searchByGenre } from "../../apis/searchMovies";
import Pagination from "../../components/Pagination/Pagination";
import SingleMovieCard from "../../components/SingleMovieCard/SingleMovieCard";

const GenrePage = () => {
  const { genre } = useParams();
  const [allMovies, setAllMovies] = useState([]);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when genre changes
    searchByGenre(genre)
      .then((data) => {
        console.log("Movies fetched by genre:", data);
        setAllMovies(data);
        // Set the first page of movies right after fetching
        setDisplayMovies(data.slice(0, moviesPerPage));
        setCurrentPage(1); // Reset to page 1 for the new genre
      })
      .catch((error) => {
        console.error("Error fetching movies by genre:", error);
        setAllMovies([]);
        setDisplayMovies([]);
      });
  }, [genre]);


  const showMoreMovies = (pageNumber) => {
    const startIndex = (pageNumber - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    setDisplayMovies(allMovies.slice(startIndex, endIndex));
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const openMovie = (index) => {
    const movieData = displayMovies[index];
    console.log("open movie ", movieData);
    setSelectedMovie(movieData);
  };

  // Handler function to close the movie card popup
  const handleCloseMovie = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="relative min-h-screen">
      {/* Main content wrapper for applying the blur effect */}
      <div className={`transition-all duration-500 ${selectedMovie ? "blur-md" : "blur-none"}`}>
        <div className="absolute inset-0 z-0">
          <img
            src="/images/movie-bg.png"
            alt="Background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-10 text-white px-6 py-16 min-h-screen mt-16">
          <h1 className="text-4xl font-bold text-center">
            THE BEST <span className="text-red-500 uppercase">{genre}</span> MOVIES
          </h1>

          <p className="text-center text-gray-400 mt-2">
            Can't decide?{" "}
            <Link to="/" className="text-red-500 cursor-pointer hover:underline">
              Use Movie Picker!
            </Link>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {displayMovies.map((movie, index) => (
              <MovieCard
                key={movie.id || index} // Use a unique movie ID if available
                openMovie={() => openMovie(index)}
                title={movie.title}
                image={movie.poster_link}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={showMoreMovies}
            totalPages={Math.ceil(allMovies.length / moviesPerPage)}
          />
        </div>
      </div>

      {/* Movie Card Popup / Overlay */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <SingleMovieCard
            {...selectedMovie}
            onClose={handleCloseMovie} // Pass the close handler to the card
          />
        </div>
      )}
    </div>
  );
};

export default GenrePage;