const StatsSection = () => {
  return (
    <div className="bg-black text-white py-16 px-6">

      <div className="flex justify-center space-x-[25vw] mt-16 pb-11">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-red-500">40,000</h2>
          <p className="text-lg text-gray-300">MOVIES</p>
        </div>
        <div className="text-center">
          <h2 className="text-5xl font-bold text-red-500">20</h2>
          <p className="text-lg text-gray-300">GENRES</p>
        </div>
        <div className="text-center">
          <h2 className="text-5xl font-bold text-red-500">10,000+</h2>
          <p className="text-lg text-gray-300">ACTORS</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pr-0 text-left">
        <h2 className="text-4xl font-bold mb-6">The Smart Way To Pick A Movie</h2>
        <p className="text-lg text-gray-300">
          Just Type How You Feel – Tell us your mood or the kind of movie you're looking for, and our AI-powered system will find the best match instantly.
        </p>
        <p className="text-lg text-gray-300 mt-2">
          No More Hard Choices – You get one recommendation at a time to make choosing effortless. Want another option? Just click "Find Another."
        </p>
        <p className="text-lg text-gray-300 mt-2">
          Hand-Picked & Smartly Matched – We use AI and vector-based search to match your emotions with the most relevant films.
        </p>
        <p className="text-lg text-gray-300 mt-2">
          Watch Trailers Instantly – See a preview before making your pick.
        </p>
        <p className="text-lg text-gray-300 mt-2">
          Fresh Picks, Always – New movies are constantly added to keep recommendations exciting.
        </p>
      </div>

      <div className="max-w-6xl mx-auto text-left mt-12">
        <h2 className="text-4xl font-bold mb-6">What Makes This Movie Recommendation Engine Unique?</h2>
        <ul className="text-lg text-gray-300 list-disc list-inside">
          <li>All listed movies are hand-picked and manually tagged by film connoisseurs ensuring high-quality recommendations.</li>
          <li>Even your mood and the occasion are considered in the movie suggestion.</li>
          <li>NEW! You can now watch movie trailers directly on our website.</li>
          <li>You get only one recommendation at a time, so there's no hard decision again (but there's a button to get another recommendation).</li>
          <li>New movies are added consistently.</li>
          <li>Special recommendations for movie dates – These movies are perfect for dates and will help you make a good impression on your crush.</li>
          <li>Special categories: Movies based on true stories, Spy Movies, Cop Movies, Heist Movies, Girl Power Movies, Racing Movies, Space Movies, Wedding Movies, IMDb Top 250 movies, movies set in New York, movies set in Las Vegas, and more.</li>
        </ul>
      </div>

      
    </div>
  );
};

export default StatsSection;
