import React from "react";
import { motion } from "framer-motion";

const MovieRecommendationCard = ({
  // Props are updated to match your backend data
  title,
  year,
  rating,
  runtime,
  genres,
  director,
  actors,
  poster_link, // Corresponds to 'image'
  imdb_link,
}) => {

  return (
    <motion.div
      // Animation and base styles remain the same
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border border-white/20 bg-zinc-900 text-white rounded-xl p-6 w-full max-w-3xl mx-auto shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-6 text-left text-gray-300">
        Recommended for you:
      </h2>

      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Poster Image */}
        <img
          src={poster_link}
          alt={`Poster for ${title}`}
          className="w-48 rounded-md shadow-md aspect-[2/3] object-cover"
        />
        
        {/* Movie Details */}
        <div className="text-left flex-1">
          {/* Title and Year */}
          <h3 className="text-3xl font-serif font-bold mb-2">
            {title}
            <span className="text-xl font-light text-gray-400 ml-2">({year})</span>
          </h3>
          
          {/* Metadata: Rating, Runtime, Genres */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-gray-300">
            <span className="flex items-center gap-1.5 font-semibold">
              ⭐ {rating.toFixed(1)}
            </span>
            <span className="text-gray-500">|</span>
            <span className="flex items-center gap-1.5">
              🕒 {Math.round(runtime)} min
            </span>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5">
              🎬 {genres}
            </span>
          </div>

          {/* Description */}
          
          {/* Director and Actors */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>
              <strong className="font-semibold text-gray-300">Director:</strong> {director}
            </p>
            <p>
              <strong className="font-semibold text-gray-300">Starring:</strong> {actors}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons: Updated to the two required buttons */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <a
          href={imdb_link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex-grow h-12 flex items-center justify-center bg-yellow-500 text-black text-md font-bold rounded-md hover:bg-yellow-600 transition-colors"
        >
          View on IMDb
        </a>
       
      </div>
    </motion.div>
  );
};

export default MovieRecommendationCard;