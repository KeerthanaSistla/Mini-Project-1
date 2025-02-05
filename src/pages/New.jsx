import React, { useState } from "react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaLink } from "react-icons/fa";
import "./New.css";

const New = () => {
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    nickname: ""
  });
  const [showPreview, setShowPreview] = useState(false);

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

  return (
    <div className="new-container">
      <div className="new-card">
        <h1 className="new-title">Add New Connection</h1>
        <div className="new-form">
          <div className="input-container">
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder=" "
              required 
            />
            <label>Name</label>
          </div>
          <div className="input-container">
            <input 
              type="text" 
              name="relation" 
              value={formData.relation} 
              onChange={handleChange} 
              placeholder=" "
              required 
            />
            <label>Relation</label>
          </div>
          <div className="input-container">
            <input 
              type="text" 
              name="nickname" 
              value={formData.nickname} 
              onChange={handleChange} 
              placeholder=" "
              required 
            />
            <label>What do you call them?</label>
          </div>
        </div>
        <div className="button-container">
          <button type="button" onClick={handleSaveDraft} className="save-draft">Save Draft</button>
          <button type="button" onClick={() => setShowPreview(true)} className="share">Share</button>
        </div>
      </div>
      {showPreview && (
        <div className="preview-overlay">
          <div className="preview-card">
            <h2 className="preview-title">Preview</h2>
            <div className="preview-content">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Relation:</strong> {formData.relation}</p>
              <p><strong>What I call them:</strong> {formData.nickname}</p>
            </div>
            <div className="share-icons">
              <FaWhatsapp className="icon whatsapp" onClick={() => handleShare("whatsapp")} />
              <FaFacebook className="icon facebook" onClick={() => handleShare("facebook")} />
              <FaInstagram className="icon instagram" onClick={() => handleShare("instagram")} />
              <FaLink className="icon link" onClick={() => handleShare("link")} />
            </div>
            <button className="close-preview" onClick={() => setShowPreview(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default New;