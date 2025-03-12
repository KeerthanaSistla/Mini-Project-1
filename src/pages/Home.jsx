// src/pages/Home.jsx

import React, { useEffect, useState } from "react";

const Home = () => {
  const [fadeInTitle, setFadeInTitle] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeInTitle(true);
    }, 500); // Delay for fade-in effect
  }, []);

  return (
    <div className={`home ${theme === "dark" ? "dark-theme" : ""}`}>
      <h1 className={`title ${fadeInTitle ? "fade-in" : ""}`}>Kinnected</h1>

      {/* Theme toggle button */}
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>
      
      {/* You can add more content here */}
    </div>
  );
};

export default Home;
