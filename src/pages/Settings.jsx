import React, { useState } from "react";
import "./Settings.css";

function Settings() {
  const [theme, setTheme] = useState("light");
  const [favorites, setFavorites] = useState([]);
  const [closeRelatives, setCloseRelatives] = useState(["John Doe", "Jane Smith"]); // Example relatives
  const [accountDeleted, setAccountDeleted] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme === "dark");
  };

  const handleFavoriteChange = (relative) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(relative)
        ? prevFavorites.filter((item) => item !== relative)
        : [...prevFavorites, relative]
    );
  };

  const handleLogout = () => {
    // Handle logout functionality here (e.g., clear user session)
    alert("Logged out!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      // Handle account deletion logic (e.g., API call to delete user)
      setAccountDeleted(true);
      alert("Your account has been deleted.");
    }
  };

  return (
    <div className="settings">
      {accountDeleted ? (
        <div className="account-deleted">
          <h2>Your account has been deleted.</h2>
        </div>
      ) : (
        <>
          <h2>Settings</h2>

          {/* Theme selection */}
          <div className="setting-item">
            <label>Select Theme:</label>
            <button onClick={toggleTheme}>
              Switch to {theme === "light" ? "Dark" : "Light"} Theme
            </button>
          </div>

          {/* Favorites: Close Relatives */}
          <div className="setting-item">
            <label>Favorite Close Relatives:</label>
            <ul>
              {closeRelatives.map((relative, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={favorites.includes(relative)}
                    onChange={() => handleFavoriteChange(relative)}
                  />
                  {relative}
                </li>
              ))}
            </ul>
          </div>

          {/* Logout option */}
          <div className="setting-item">
            <button onClick={handleLogout}>Logout</button>
          </div>

          {/* Delete Account option */}
          <div className="setting-item">
            <button className="delete-account" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Settings;
