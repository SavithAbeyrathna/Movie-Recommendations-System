import { useState, useEffect } from "react"; // 1. Import useEffect
import { Link, useLocation } from "react-router-dom"; // 2. Import useLocation
import { motion, AnimatePresence } from "framer-motion";
import actorsData from "../../data/actors.json";

// Reusable Dropdown Component (No changes needed here)
const Dropdown = ({ label, items, isOpen, onToggle, onClose, isMobile = false }) => {
  const dropdownClasses = isMobile
    ? "bg-zinc-900 text-white shadow-md mt-2 max-h-60 overflow-y-auto"
    : "absolute left-0 mt-2 w-56 bg-black text-white shadow-lg rounded-md max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-black";

  return (
    <div className={isMobile ? "text-center" : "relative"}>
      <button
        className="hover:text-red-500 flex items-center justify-center w-full"
        onClick={onToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label}
        <span className={`ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={dropdownClasses}
          >
            {items.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                className="block px-4 py-2 hover:bg-red-600 transition-colors duration-150"
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isActorsOpen, setIsActorsOpen] = useState(false);
  const location = useLocation(); // 3. Get the current location

  // --- 4. ADDED: This effect closes dropdowns on any navigation ---
  useEffect(() => {
    // This code runs every time the user navigates to a new page (URL path changes)
    setIsGenreOpen(false);
    setIsActorsOpen(false);
  }, [location.pathname]); // The effect depends on the URL path

  const genres = [
    "Action", "Comedy", "Drama", "Thriller", "Adventure",
    "Romance", "Crime", "Science Fiction", "Fantasy", "Family"
  ];

  const toggleGenreDropdown = () => {
    setIsGenreOpen(!isGenreOpen);
    setIsActorsOpen(false);
  };

  const toggleActorsDropdown = () => {
    setIsActorsOpen(!isActorsOpen);
    setIsGenreOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  // Prepare data for the dropdowns
  const genreItems = genres.map(genre => ({
    key: genre,
    to: `/genres/${genre.toLowerCase().replace(" ", "-")}`,
    label: genre,
  }));

  const actorItems = actorsData.map(actor => ({
    key: actor.id,
    to: `/actors/${actor.id}`,
    label: actor.name,
  }));

  return (
    <nav className="bg-black text-white fixed w-full top-0 shadow-lg z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider">
          M<span className="text-red-600">R</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-red-500 transition-colors duration-200">Movie Picker</Link>
          <Dropdown
            label="Top Genres"
            items={genreItems}
            isOpen={isGenreOpen}
            onToggle={toggleGenreDropdown}
            onClose={() => setIsGenreOpen(false)}
          />
          <Dropdown
            label="Top Actors"
            items={actorItems}
            isOpen={isActorsOpen}
            onToggle={toggleActorsDropdown}
            onClose={() => setIsActorsOpen(false)}
          />
          {/* Blog link removed from here */}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white focus:outline-none text-2xl" onClick={toggleMobileMenu}>
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black text-white border-t border-zinc-800"
          >
            <div className="px-6 py-4 space-y-4">
              <Link to="/" className="block text-center hover:text-red-500" onClick={() => setIsOpen(false)}>Movie Picker</Link>
              <Dropdown
                label="Top Genres"
                items={genreItems}
                isOpen={isGenreOpen}
                onToggle={toggleGenreDropdown}
                onClose={() => { setIsGenreOpen(false); setIsOpen(false); }}
                isMobile={true}
              />
              <Dropdown
                label="Top Actors"
                items={actorItems}
                isOpen={isActorsOpen}
                onToggle={toggleActorsDropdown}
                onClose={() => { setIsActorsOpen(false); setIsOpen(false); }}
                isMobile={true}
              />
              {/* Blog link removed from here */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;