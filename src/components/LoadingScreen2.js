import React, { useState } from "react";

export default function LoadingScreen2({
  text = "Preview of Museum 2 ...",
  onContinue,
}) {
  const [selectedImage, setSelectedImage] = useState(null); // 🔍 for zoom overlay

  const artworks = [
    {
      src: "/images/door2.1.jpg",
      title: "The Assassination of Governor Bustamante",
      artist: "Félix Resurrección Hidalgo",
    },
    {
      src: "/images/door2.2.jpg",
      title: "Spoliarium",
      artist: "Juan Luna",
    },
    {
      src: "/images/door2.3.jpg",
      title: "Bust of Juan Luna",
      artist: "Anastacio T. Caedo",
    },
    {
      src: "/images/door2.5.jpg",
      title: "The monument of Arthur Walsh Fergusson",
      artist: "Mariano Benlliure Y Gil",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        animation: "fadeIn 0.5s ease-in",
      }}
    >
      {/* Loading Text */}
      <div
        style={{
          fontSize: "42px",
          color: "white",
          marginBottom: "30px",
          textShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        {text}
      </div>

      {/* Artwork Previews */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginBottom: "60px",
          flexWrap: "wrap",
        }}
      >
        {artworks.map((art, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              color: "white",
              width: "260px",
              animation: "floatUpDown 3s ease-in-out infinite",
              cursor: "pointer",
            }}
            onClick={() => setSelectedImage(art)} // ✅ Click to zoom
          >
            <img
              src={art.src}
              alt={art.title}
              style={{
                width: "100%",
                height: "180px",
                borderRadius: "16px",
                objectFit: "cover",
                boxShadow: "0 0 25px rgba(255, 255, 255, 0.4)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 0 40px rgba(255, 255, 255, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(255, 255, 255, 0.4)";
              }}
            />
            <div
              style={{
                marginTop: "12px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {art.title}
            </div>
            <div style={{ fontSize: "16px", opacity: 0.8 }}>
              by {art.artist}
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        style={{
          padding: "14px 36px",
          fontSize: "18px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          background: "linear-gradient(135deg, #b80000, #ff2e2e)",
          color: "white",
          boxShadow: "0 4px 15px rgba(255, 0, 0, 0.5)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow =
            "0 6px 25px rgba(255, 0, 0, 0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 15px rgba(255, 0, 0, 0.5)";
        }}
      >
        Continue ➤
      </button>

      {/* 🔍 Zoomed-in Image Overlay */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
            cursor: "zoom-out",
            animation: "fadeIn 0.3s ease-in",
          }}
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            style={{
              maxWidth: "90%",
              maxHeight: "85%",
              borderRadius: "20px",
              boxShadow: "0 0 60px rgba(255,255,255,0.8)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              color: "#fff",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            <strong>{selectedImage.title}</strong> <br />
            <em>{selectedImage.artist}</em>
          </div>
        </div>
      )}

      {/* 🎬 CSS Animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes floatUpDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
}
