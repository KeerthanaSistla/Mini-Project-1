import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "./Header.css";

const Header = ({ fadeIn }) => {
  const [menuActive, setMenuActive] = useState(false);
  const menuRef = useRef(null); // Reference to the menu

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuActive(false);
      }
    };

    // Attach event listener when menu is active
    if (menuActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuActive]);

  return (
    <header className={`header ${fadeIn ? "fade-in" : ""}`}>
      <Link to="/" className="icon home">
        <FaHome />
      </Link>

      <div className="menu-wrapper" ref={menuRef}>
        <FiMenu className="icon menu-icon" onClick={toggleMenu} />
        <ul className={`menu ${menuActive ? "active" : ""}`}>
          <li><Link to="/new" onClick={() => setMenuActive(false)}>New Kin</Link></li>
          <li><Link to="/settings" onClick={() => setMenuActive(false)}>Settings</Link></li>
          <li><Link to="/logout" onClick={() => setMenuActive(false)}>Logout</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
