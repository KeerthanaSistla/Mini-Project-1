import React, { useState } from "react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaLink } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "./New.css";

const New = () => {
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    nickname: ""
  });
  const [showPreview, setShowPreview] = useState(false);
  const { theme } = useTheme(); // Get the current theme

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveDraft = () => {
    console.log("Draft saved", formData);
  };

  const generateShareMessage = () => {
    return `Check out this connection!\n\nName: ${formData.name}\nRelation: ${formData.relation}\nWhat I call them: ${formData.nickname}`;
  };

  const handleShare = (platform) => {
    const message = encodeURIComponent(generateShareMessage());
    if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${message}`, "_blank");
    } else if (platform === "instagram") {
      alert("Instagram does not support direct text sharing. You can copy the message and share manually.");
    } else if (platform === "link") {
      navigator.clipboard.writeText(generateShareMessage());
      alert("Link copied to clipboard!");
    }
  };
  
  const labelStyle = {
    color: theme.secondary,
    backgroundColor: theme.cardBg
  };

  const buttonStyle = (color) => ({
    backgroundColor: color,
    color: "white"
  });


  return (
    <div className="new-container" style={{ backgroundColor: theme.background }}>
      <div className="new-card">
        <h1 className="new-title" style={{ color: theme.primary }}>Add New Connection</h1>
        <div className="new-form">
          <div className="input-container">
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder=" "
              required 
              style={inputStyle}
            />
            <label style={labelStyle}>Name</label>
          </div>
          <div className="input-container">
            <input 
              type="text" 
              name="relation" 
              value={formData.relation} 
              onChange={handleChange} 
              placeholder=" "
              required 
              style={inputStyle}
            />
            <label style={labelStyle}>Relation</label>
          </div>
          <div className="input-container">
            <input 
              type="text" 
              name="nickname" 
              value={formData.nickname} 
              onChange={handleChange} 
              placeholder=" "
              required 
              style={inputStyle}
            />
            <label style={labelStyle}>What do you call them?</label>
          </div>
        </div>
        <div className="button-container">
          <button 
            type="button" 
            onClick={handleSaveDraft} 
            className="save-draft"
            style={buttonStyle(theme.secondary)}
          >
            Save Draft
          </button>
          <button 
            type="button" 
            onClick={() => setShowPreview(true)} 
            className="share"
            style={buttonStyle(theme.success)}
          >
            Share
          </button>
        </div>
      </div>
      {showPreview && (
        <div className="preview-overlay">
          <div className="preview-card" style={{ backgroundColor: theme.cardBg }}>
            <h2 className="preview-title" style={{ color: theme.primary }}>Preview</h2>
            <div className="preview-content" style={{ backgroundColor: theme.background, color: theme.text }}>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Relation:</strong> {formData.relation}</p>
              <p><strong>What I call them:</strong> {formData.nickname}</p>
            </div>
            <div className="share-icons">
              <FaWhatsapp className="icon whatsapp" onClick={() => handleShare("whatsapp")} />
              <FaFacebook className="icon facebook" onClick={() => handleShare("facebook")} />
              <FaInstagram className="icon instagram" onClick={() => handleShare("instagram")} />
              <FaLink className="icon link" onClick={() => handleShare("link")} style={{ color: theme.secondary }} />
            </div>
            <button 
              className="close-preview" 
              onClick={() => setShowPreview(false)}
              style={buttonStyle(theme.error)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default New;