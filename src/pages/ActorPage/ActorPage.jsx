import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Added Link for the picker
import MovieCard from "../../components/MovieCard/MovieCard";
import actorsData from "../../data/actors.json";
import { searchByActor } from "../../apis/searchMovies";
import Pagination from "../../components/Pagination/Pagination";
import SingleMovieCard from "../../components/SingleMovieCard/SingleMovieCard";

const ActorPage = () => {
  const { actorId } = useParams();
  const actor = actorsData.find((a) => a.id === actorId);
  const [allMovies, setAllMovies] = useState([]);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  useEffect(() => {
    // 1. ADDED CHECK: Only run the search if the actor is found
    if (actor) {
      window.scrollTo(0, 0);
      searchByActor(actor.name)
        .then((data) => {
          console.log("Movies fetched by actor:", data);
          setAllMovies(data);
          // Initially display the first page of the new actor's movies
          setDisplayMovies(data.slice(0, moviesPerPage));
          setCurrentPage(1);
        })
        .catch((error) => {
          console.error("Error fetching movies by actor:", error);
          setAllMovies([]);
          setDisplayMovies([]);
        });
    }
  }, [actor]);

  // 2. REMOVED: The redundant useEffect that was here is gone.

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

  const handleCloseMovie = () => {
    setSelectedMovie(null);
  };

  if (!actor) {
    return <h1 className="text-white text-center mt-10">Actor Not Found</h1>;
  }

  return (
    <div className="relative min-h-screen">
      <div className={`transition-all duration-500 ${selectedMovie ? "blur-md" : "blur-none"}`}>
        <div className="absolute inset-0 z-0">
          <img
            src="/images/movie-bg.png"
            alt="Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 min-h-screen text-white px-6 py-16">
          {/* 3. STYLING FIX: Changed text-black to text-white */}
          <h1 className="text-4xl font-bold text-center text-black mt-10">
            BEST MOVIES OF <span className="text-red-500 uppercase">{actor.name}</span>
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
                key={movie.id || index}
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

      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <SingleMovieCard
            {...selectedMovie}
            onClose={handleCloseMovie}
          />
        </div>
      )}
    </div>
  );
};

export default ActorPage;