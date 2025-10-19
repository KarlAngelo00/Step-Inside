import React, { useState } from "react";
import "./LandingPage.css";

const LandingPage = ({ onEnter }) => {
  const [fade, setFade] = useState(false);

  const handleStart = () => {
    setFade(true);
    setTimeout(() => {
      onEnter();
    }, 800); // match fadeOut duration
  };

  return (
    <div className={`landing-page ${fade ? "fade-out" : ""}`}>
      <h1>Welcome to Step Inside History</h1>
      <p>
        Explore an immersive virtual museum experience showcasing timeless
        artworks and history like never before.
      </p>
      <div className="buttons">
        <button onClick={handleStart}>Start Virtual Tour</button>
        
      </div>
      <footer>© 2025 Step Inside History. All rights reserved.</footer>
    </div>
  );
};

export default LandingPage;
