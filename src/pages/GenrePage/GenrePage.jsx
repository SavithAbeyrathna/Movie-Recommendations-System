import  { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard"; // Import the MovieCard component
import { searchByGenre } from "../../apis/searchMovies";
import Pagination from "../../components/Pagination/Pagination";
import SingleMovieCard from "../../components/SingleMovieCard/SingleMovieCard"

const GenrePage = () => {
  const { genre } = useParams(); // Get genre from URL params

  const [allMovies, setAllMovies] = useState([]);
  const[displayMovies,setDisplayMovies]=useState([]);
  const [selectedMovie,setSelectedMovie]=useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  useEffect(() => {
    searchByGenre(genre)
      .then((data) => {
        console.log("Movies fetched by genre:", data);
        setAllMovies(data);

      })
      .catch((error) => {
        console.error("Error fetching movies by genre:", error);
        setAllMovies([]); // Set to empty array on error
      });
  }, [genre]);

  useEffect(() => {
    showMoreMovies(currentPage);
  }, [allMovies]);

  const showMoreMovies = (pageNumber) => {
    const startIndex = (pageNumber - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    setDisplayMovies(allMovies.slice(startIndex, endIndex));
    setCurrentPage(pageNumber);
  }

  const openMovie = (index) => {
    console.log("open movie ", displayMovies[index])
    setSelectedMovie(displayMovies[index])
  }

    

  return (
    <div className="relative min-h-screen">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/movie-bg.png" // 👈 Replace with your image path
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10  text-black px-6 py-16 min-h-screen mt-16">
        <h1 className="text-4xl font-bold text-center">
          THE BEST <span className="text-red-500 uppercase">{genre}</span> MOVIES
        </h1>
        <p className="text-center text-black mt-2">
          Can't decide? <span className="text-red-500 cursor-pointer hover:underline">Use Movie Picker!</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {displayMovies.map((movie,index) => (
            <MovieCard
              key={index}
              openMovie={()=> openMovie(index)}
              title={movie.title}
              image={movie.poster_link}
            />
          ))}
        </div>

       {/* Pagination */}
      <Pagination currentPage={currentPage}  setCurrentPage={showMoreMovies}  totalPages={Math.ceil(allMovies.length / moviesPerPage)}/>

      {selectedMovie && 
         <SingleMovieCard

          {...selectedMovie}
          onNextRecommendation={() => setShowCard(false)} // This button will hide the card
        />
      }
      </div>
    </div>
  );
};

export default GenrePage;
