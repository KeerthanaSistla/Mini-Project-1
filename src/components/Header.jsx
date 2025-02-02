import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "./Header.css";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Fade-in effect for the header
  useEffect(() => {
    const header = document.querySelector(".header");
    setTimeout(() => {
      header.classList.add("fade-in"); // Adding fade-in class after the component mounts
    }, 100); // Small delay to allow the page to load
  }, []);

  return (
    <header className="header">
      <FaHome className="icon home" />
      <div className={`menu-wrapper ${menuActive ? "active" : ""}`}>
        <FiMenu className="icon menu" onClick={toggleMenu} />
        <ul className={`menu ${menuActive ? "active" : ""}`}>
          <li>Create New Kin</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
