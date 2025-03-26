import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Preloader from "./Preloader";
import Home from "./pages/Home";
import New from "./pages/New";
import Settings from "./pages/Settings";
import "./App.css";

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeInHeader, setFadeInHeader] = useState(false);
  const [theme, setTheme] = useState("light");
  
  // Check if there is a saved theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply the theme globally when it changes
  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
    localStorage.setItem("theme", theme); // Persist theme in localStorage
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };


  const handlePreloadFinish = () => {
    setIsLoading(false);
    setTimeout(() => {
      setFadeInHeader(true); // Trigger the fade-in effect for the header after a slight delay
    }, 1000); // Delay to ensure preloader has completely faded
  };

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setFadeInHeader(true);
      }, 2500); // Delay to allow the header fade-in to complete
    }
  }, [isLoading]);

  return (
    <div className="app">
      {isLoading ? (
        <Preloader onFinish={handlePreloadFinish} />
      ) : (
        <>
          <Header fadeIn={fadeInHeader} />
          <Routes>
            <Route
              path="/"
              element={<Home toggleTheme={toggleTheme} theme={theme} />}
            />
            <Route
              path="/new"
              element={<New toggleTheme={toggleTheme} theme={theme} />}
            />
            <Route
              path="/settings"
              element={<Settings toggleTheme={toggleTheme} theme={theme} />}
            />
          </Routes>
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
