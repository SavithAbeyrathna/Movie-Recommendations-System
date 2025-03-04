import { useState } from "react";
import Popup from "../Popup/Popup";

const HeroSection = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover brightness-50 blur-none"
      >
        <source src="/BGvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 text-white px-6">
        <h1 className="text-6xl font-bold">
          MOVIE <span className="text-red-500">RECOMMENDATION</span> SYSTEM
        </h1>
        <p className="text-lg mt-4">Enter your preferences and get the best movie suggestions.</p>
        <button
          className="mt-6 px-6 py-3 bg-white text-black font-bold rounded-full"
          onClick={() => setShowPopup(true)}
        >
          Start Now
        </button>
      </div>

      {/* Show Popup when button is clicked */}
      {showPopup && (
        <Popup
          title="Get Recommendation"
          onClose={() => setShowPopup(false)}
          actions={[
            {
              label: "Submit",
              className: "bg-red-600 hover:bg-red-700 text-white",
              onClick: () => alert("Submitting..."),
            },
          ]}
        >
          <input
            type="text"
            placeholder="Enter your preference..."
            className="w-full p-3 bg-black border border-gray-400 rounded-md focus:outline-none focus:border-red-500"
          />
        </Popup>
      )}
    </div>
  );
};

export default HeroSection;
