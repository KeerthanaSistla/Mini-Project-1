import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Preloader from "./Preloader";
import "./App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeInTitle, setFadeInTitle] = useState(false); // Track title fade-in state
  const [fadeInHeader, setFadeInHeader] = useState(false); // Track header fade-in state

  const handlePreloadFinish = () => {
    setIsLoading(false); // Hide preloader
    setTimeout(() => {
      setFadeInTitle(true); // Trigger the fade-in effect for the title after a slight delay
    }); // Delay to ensure preloader has completely faded
  };

  useEffect(() => {
    if (fadeInTitle) {
      setTimeout(() => {
        setFadeInHeader(true); // Fade in the header after the title
      }, 1000); // Delay to allow the title fade-in to complete
    }
  }, [fadeInTitle]);

  return (
    <div className="app">
      {isLoading ? (
        <Preloader onFinish={handlePreloadFinish} />
      ) : (
        <>
          <Header fadeIn={fadeInHeader} />
          <h1 className={`title ${fadeInTitle ? "fade-in" : ""}`}>Kinnected</h1> {/* Title with fade-in */}
        </>
      )}
    </div>
  );
};

export default App;
