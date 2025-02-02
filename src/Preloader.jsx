import React, { useEffect, useState } from "react";
import "./Preloader.css";

const Preloader = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeOut(true); // Start fading out the preloader
      setTimeout(() => {
        onFinish(); // Inform parent that preloading is done
      }, 1000); // Delay to allow fade-out transition to complete
    }, 3000); // Wait for 3 seconds before fading out
  }, [onFinish]);

  return (
    <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
      <div className="bubbles">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="bubble"></span>
        ))}
      </div>
    </div>
  );
};

export default Preloader;
