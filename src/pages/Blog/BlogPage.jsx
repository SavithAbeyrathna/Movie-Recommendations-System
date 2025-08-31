import React, { useState } from "react";
import SingleMovieCard from "../../components/SingleMovieCard/SingleMovieCard"; // Adjust path as needed

const BlogPage = () => {
  // 1. State to control the visibility of the movie card
  const [showCard, setShowCard] = useState(false);

  // 2. Dummy data for the movie card component
  const dummyMovieData = {
    title: "Inception",
    year: 2010,
    rating: 8.8,
    runtime: 148,
    genres: "Action, Adventure, Sci-Fi",
    director: "Christopher Nolan",
    actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    posterLink: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    imdbLink: "https://www.imdb.com/title/tt1375666/",
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* 3. Show the button only if the card is not visible */}
      {!showCard && (
        <button
          onClick={() => setShowCard(true)}
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors duration-300"
        >
          Show Movie Recommendation
        </button>
      )}

      {/* 4. Conditionally render the MovieRecommendationCard when showCard is true */}
      {showCard && (
        <SingleMovieCard
          {...dummyMovieData}
          onNextRecommendation={() => setShowCard(false)} // This button will hide the card
        />
      )}
    </div>
  );
};

export default BlogPage;