import React, { useState } from "react";
import "./ArtifactModal.css"; // Import the CSS file

const ArtifactModal = ({ isOpen, onClose, title, author, image, description }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${isFullscreen ? "fullscreen" : ""}`}>
        {/* Close button */}
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        {/* Title and author */}
        {!isFullscreen && (
          <>
            <h1 className="modal-title">{title}</h1>
            <p className="modal-author">by {author}</p>
            <hr className="divider" />
          </>
        )}

        {/* Image */}
        <div className={`image-container ${isFullscreen ? "black-bg" : ""}`}>
          <img
            src={image}
            alt={title}
            className={`modal-image ${isFullscreen ? "image-full" : ""}`}
            onClick={() => setIsFullscreen(!isFullscreen)}
          />
        </div>

        {/* Description */}
        {!isFullscreen && (
          <div className="modal-description">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtifactModal;
