import React, { useState, useEffect } from "react";
import Preloader from "./Preloader";
import "./App.css"; // Import styles

const App = () => {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setFadeIn(true);
      }, 300); // Small delay before the fade-in starts
    }
  }, [loading]);

  return loading ? (
    <Preloader onFinish={() => setLoading(false)} />
  ) : (
    <div className={`app ${fadeIn ? "fade-in" : ""}`}>
      <h1>Kinnected</h1>
      {/* Your actual app content goes here */}
    </div>
  );
};

export default App;
