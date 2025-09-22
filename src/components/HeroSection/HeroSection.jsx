import { useState } from "react";
import Popup from "../Popup/Popup";
import MovieRecommendationCard from "../../components/MovieRecommendationCard/MovieRecommendationCard";
import axiosInstance from "../../apis/axios";

const HeroSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const [recommendationList, setRecommendationList] = useState([]);
  const [recommendedMovie, setRecommendedMovie] = useState(null);

  const setNextRecommendation = () => {
    if (recommendationList.length === 0) return;
    const data = recommendationList[recommendationIndex];
    const movieData = {
      title: data.title,
      year: data.year,
      description: data.description,
      rating: data.rating,
      runtime: data.runtime,
      genres: data.genres,
      director: data.director,
      actors: data.actors,
      posterLink: data.poster_link,
      imdbLink: data.imdb_link,
    };
    setRecommendedMovie(movieData);
    const nextIndex = (recommendationIndex + 1) % recommendationList.length;
    setRecommendationIndex(nextIndex);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    axiosInstance.post('/recommend', { prompt })
      .then(response => {
        const recommendations = response.data.recommendations || [];
        if (recommendations.length > 0) {
          setRecommendationList(recommendations);
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
          setRecommendationIndex(1);
        } else {
          setRecommendationList([]);
          setRecommendedMovie(null);
        }
      })
      .catch(error => {
        console.error("Error fetching recommendation:", error);
        setRecommendationList([]);
        setRecommendedMovie(null);
      })
      .finally(() => {
        setShowPopup(false);
        setLoading(false);
        setPrompt(""); // Clears the input field for the next use
      });
  };

  // Handles closing the recommendation card
  const handleCloseCard = () => {
    setRecommendedMovie(null);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center text-center px-4 py-10 overflow-hidden">
      {/* Background Video with conditional blur */}
      <video
        autoPlay
        loop
        muted
        className={`absolute inset-0 w-full h-full object-cover brightness-50 transition-all duration-500 ${
          recommendedMovie ? 'blur-md scale-110' : 'blur-none scale-100'
        }`}
      >
        <source src="/BGvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Content with conditional blur */}
      <div
        className={`relative z-10 text-white max-w-4xl w-full transition-all duration-500 ${
          recommendedMovie ? 'blur-md' : 'blur-none'
        }`}
      >
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
          Click here
        </button>
      </div>

      {/* Movie Card is rendered on top of the blurred content */}
      {recommendedMovie && (
        <div className="absolute z-20">
          <MovieRecommendationCard
            {...recommendedMovie}
            onNextRecommendation={setNextRecommendation}
            onClose={handleCloseCard} 
          />
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <Popup
          title="Get Recommendation"
          onClose={() => setShowPopup(false)}
          actions={[{ label: loading ? "Finding Movies..." : "Submit", className: "bg-red-600 hover:bg-red-700 text-white", onClick: handleSubmit, disabled: loading }]}
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