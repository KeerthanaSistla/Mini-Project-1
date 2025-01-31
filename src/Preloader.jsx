import React, { useEffect, useState } from "react";
import "./Preloader.css";

const Preloader = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onFinish(), 1000); // Ensures smooth transition
    }, 2500); // Adjust time for animation
  }, [onFinish]);

  return (
    <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
      <div className="bubbles">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="bubble"></span>
        ))}
      </div>
    </div>
  );
};

export default Preloader;
