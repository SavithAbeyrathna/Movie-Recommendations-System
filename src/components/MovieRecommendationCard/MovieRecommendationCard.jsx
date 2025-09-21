import React from "react";
import { motion } from "framer-motion";

const MovieRecommendationCard = ({
  title,
  year,
  description,
  rating,
  runtime,
  genres,
  director,
  actors,
  posterLink,
  imdbLink,
  onNextRecommendation,
  onClose, // <-- ADD THIS PROP
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      // Add 'relative' for positioning the close button
      className="relative border border-white/20 bg-zinc-900 text-white rounded-xl p-6 w-full max-w-3xl mx-auto shadow-lg"
    >
      {/* --- ADD THIS BUTTON --- */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 className="text-xl font-semibold mb-6 text-left text-gray-300">
        Recommended for you:
      </h2>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <img src={posterLink} alt={`Poster for ${title}`} className="w-48 rounded-md shadow-md aspect-[2/3] object-cover" />
        <div className="text-left flex-1">
          <h3 className="text-3xl font-serif font-bold mb-2">
            {title}
            <span className="text-xl font-light text-gray-400 ml-2">({year})</span>
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-gray-300">
            <span className="flex items-center gap-1.5 font-semibold">⭐ {rating.toFixed(1)}</span>
            <span className="text-gray-500">|</span>
            <span className="flex items-center gap-1.5">🕒 {Math.round(runtime)} min</span>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5">🎬 {genres}</span>
          </div>
          <p className="text-sm text-gray-300 mb-4">{description}</p>
          <div className="text-xs text-gray-400 space-y-1">
            <p><strong className="font-semibold text-gray-300">Director:</strong> {director}</p>
            <p><strong className="font-semibold text-gray-300">Starring:</strong> {actors}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <a href={imdbLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex-grow h-12 flex items-center justify-center bg-yellow-500 text-black text-md font-bold rounded-md hover:bg-yellow-600 transition-colors">
          View on IMDb
        </a>
        <button onClick={onNextRecommendation} className="w-full sm:w-auto flex-grow h-12 bg-red-700 border border-white/20 hover:bg-red-800 text-white text-md font-bold rounded-md transition-colors">
          Get Another Recommendation
        </button>
      </div>
    </motion.div>
  );
};

export default MovieRecommendationCard;