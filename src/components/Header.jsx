import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "./Header.css";

const Header = ({ fadeIn }) => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    const header = document.querySelector(".header");
    if (fadeIn) {
      setTimeout(() => {
        header.classList.add("fade-in");
      }, 100);
    }
  }, [fadeIn]);

  return (
    <header className={`header ${fadeIn ? "fade-in" : ""}`}>
      <Link to="/" className="icon home">
        <FaHome />
      </Link>

      <div className="menu-wrapper">
        <FiMenu className="icon menu-icon" onClick={toggleMenu} />
        <ul className={`menu ${menuActive ? "active" : ""}`}>
          <li><Link to="/new" onClick={() => setMenuActive(false)}>Create New Kin</Link></li>
          <li><Link to="/settings" onClick={() => setMenuActive(false)}>Settings</Link></li>
          <li><Link to="/logout" onClick={() => setMenuActive(false)}>Logout</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
