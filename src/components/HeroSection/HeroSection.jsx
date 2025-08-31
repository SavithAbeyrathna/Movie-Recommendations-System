import { useState } from "react";
import Popup from "../Popup/Popup";
import MovieRecommendationCard from "../../components/MovieRecommendationCard/MovieRecommendationCard"; // Adjust path as needed
import axiosInstance from "../../apis/axios";

const HeroSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const [recommendationList, setRecommendationList] = useState([]);
  const [recommendedMovie, setRecommendedMovie] = useState(null);

  // This function is now correctly mapped to the card's props.
  // It's used by the "Get Another Recommendation" button.
  const setNextRecommendation = () => {
    if (recommendationList.length === 0) return;
   
    const data = recommendationList[recommendationIndex];
  
    // Correctly map backend data (e.g., poster_link) to component props (e.g., posterLink)
    const movieData = {
      title: data.title,
      year: data.year,
      description: data.description,
      rating: data.rating,
      runtime: data.runtime,
      genres: data.genres,
      director: data.director,
      actors: data.actors,
      posterLink: data.poster_link, // snake_case from backend to camelCase for prop
      imdbLink: data.imdb_link,     // snake_case from backend to camelCase for prop
    };

    setRecommendedMovie(movieData);

    // Prepare the index for the next click
    const nextIndex = (recommendationIndex + 1) % recommendationList.length;
    setRecommendationIndex(nextIndex);
  };

  // This function is updated to handle the initial API response correctly.
  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    axiosInstance.post('/recommend', { prompt })
      .then(response => {
        const recommendations = response.data.recommendations || [];
        
        if (recommendations.length > 0) {
          // Set the entire list of recommendations
          setRecommendationList(recommendations);

          // Manually create and display the FIRST movie from the list
          const firstMovieData = recommendations[0];
          setRecommendedMovie({
            title: firstMovieData.title,
            year: firstMovieData.year,
            description: firstMovieData.description,
            rating: firstMovieData.rating,
            runtime: firstMovieData.runtime,
            genres: firstMovieData.genres,
            director: firstMovieData.director,
            actors: firstMovieData.actors,
            posterLink: firstMovieData.poster_link,
            imdbLink: firstMovieData.imdb_link,
          });

          // Set the index to 1 for the *next* recommendation
          setRecommendationIndex(1);
        } else {
          // If no recommendations are found, clear the state
          setRecommendationList([]);
          setRecommendedMovie(null);
        }
      })
      .catch(error => {
        console.error("Error fetching recommendation:", error);
        // Clear out old recommendations on error
        setRecommendationList([]);
        setRecommendedMovie(null);
      })
      .finally(() => {
        setShowPopup(false);
        setLoading(false);
      });
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center text-center px-4 py-10">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      >
        <source src="/BGvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-10 text-white max-w-4xl w-full">
        <h1 className="text-5xl md:text-6xl font-bold">
          MOVIE <span className="text-red-500">RECOMMENDATION</span> SYSTEM
        </h1>
        <p className="text-lg mt-4">
          Enter your preferences and get the best movie suggestions.
        </p>
        <button
          className="mt-6 px-6 py-3 bg-transparent border border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors duration-300"
          onClick={() => setShowPopup(true)}
        >
          Start Now
        </button>

        {/* Movie Card - Props are now passed correctly */}
        {recommendedMovie && (
          <div className="mt-10">
            <MovieRecommendationCard
              {...recommendedMovie} // Use spread operator to pass all correct props
              onNextRecommendation={setNextRecommendation}
            />
          </div>
        )}
      </div>

      {/* Popup */}
      {showPopup && (
        <Popup
          title="Get Recommendation"
          onClose={() => setShowPopup(false)}
          actions={[
            {
              label: loading ? "Finding Movies..." : "Submit",
              className: "bg-red-600 hover:bg-red-700 text-white",
              onClick: handleSubmit,
              disabled: loading,
            },
          ]}
        >
          <input
            type="text"
            placeholder="e.g., 'a mind-bending sci-fi movie with great visuals'"
            className="w-full p-3 bg-black border border-gray-400 rounded-md focus:outline-none focus:border-red-500 text-white"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </Popup>
      )}
    </div>
  );
};

export default HeroSection;