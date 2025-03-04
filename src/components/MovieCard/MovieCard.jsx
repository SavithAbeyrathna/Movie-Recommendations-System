import React from "react";

const MovieCard = ({ title, image }) => {
  return (
    <div className="bg-black p-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-80 object-cover rounded-lg"
      />
    </div>
  );
};

export default MovieCard;
