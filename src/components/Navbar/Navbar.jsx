import { useState } from "react";
import { Link } from "react-router-dom";
import actorsData from "../../data/actors.json"; // Import actors JSON
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isActorsOpen, setIsActorsOpen] = useState(false);

  const genres = [
    "Action", "Comedy", "Drama", "Thriller", "Adventure",
    "Romance", "Crime", "Science Fiction", "Fantasy", "Family"
  ];

  // Toggle Functions
  const toggleGenreDropdown = () => {
    setIsGenreOpen(!isGenreOpen);
    setIsActorsOpen(false); // Close actors dropdown when opening genres
  };

  const toggleActorsDropdown = () => {
    setIsActorsOpen(!isActorsOpen);
    setIsGenreOpen(false); // Close genres dropdown when opening actors
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white fixed w-full top-0 shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          M <span className="text-red-600">R</span> 
        </Link>

        {/* Desktop Navbar */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-red-500">Movie Picker</Link>

          {/* Genre Dropdown */}
          <div className="relative">
            <button 
              className="hover:text-red-500 flex items-center"
              onClick={toggleGenreDropdown}
            >
              Top Genres 
            </button>
            {isGenreOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-black text-white shadow-lg rounded-md">
                {genres.map((genre) => (
                  <Link 
                    key={genre} 
                    to={`/genres/${genre.toLowerCase()}`} 
                    className="block px-4 py-2 hover:bg-red-600"
                    onClick={() => setIsGenreOpen(false)} // Close dropdown after clicking
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Actors Dropdown */}
          <div className="relative">
            <button 
              className="hover:text-red-500 flex items-center"
              onClick={toggleActorsDropdown}
            >
              Top Actors 
            </button>
            {isActorsOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-black text-white shadow-lg rounded-md scroll-y-auto max-h-90 overflow-scroll">
                {actorsData.map((actor) => (
                  <Link 
                    key={actor.id} 
                    to={`/actors/${actor.id}`} 
                    className="block px-4 py-2 hover:bg-red-600"
                    onClick={() => setIsActorsOpen(false)} // Close dropdown after clicking
                  >
                    {actor.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/blog" className="hover:text-red-500">Blog</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-white py-4 space-y-4">
          <Link to="/" className="block text-center hover:text-red-500" onClick={() => setIsOpen(false)}>Movie Picker</Link>
          
          {/* Mobile Genres Dropdown */}
          <div className="text-center">
            <button className="w-full hover:text-red-500" onClick={toggleGenreDropdown}>
              Top Genres ▼
            </button>
            {isGenreOpen && (
              <div className="bg-black text-white shadow-md mt-2">
                {genres.map((genre) => (
                  <Link 
                    key={genre} 
                    to={`/genres/${genre.toLowerCase()}`} 
                    className="block px-4 py-2 hover:bg-red-600"
                    onClick={() => {
                      setIsGenreOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Actors Dropdown */}
          <div className="text-center">
            <button className="w-full hover:text-red-500" onClick={toggleActorsDropdown}>
              Top Actors ▼
            </button>
            {isActorsOpen && (
              <div className="bg-black text-white shadow-md mt-2">
                {actorsData.map((actor) => (
                  <Link 
                    key={actor.id} 
                    to={`/actors/${actor.id}`} 
                    className="block px-4 py-2 hover:bg-red-600"
                    onClick={() => {
                      setIsActorsOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    {actor.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/blog" className="block text-center hover:text-red-500" onClick={() => setIsOpen(false)}>Blog</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
