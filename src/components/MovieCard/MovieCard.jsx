import React from "react";

const MovieCard = ({ title, image, openMovie }) => {
  
  return (
    <div onClick={openMovie} className="bg-black p-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-80 object-cover rounded-lg"
      />
      <h3 className="mt-2 text-white text-center font-semibold">{title}</h3>
    </div>
  );
};

export default MovieCard;
