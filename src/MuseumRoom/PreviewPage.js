import React, { useState } from "react";

export default function PreviewPage({ onBackRoom, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null); // 🔍 For zoom overlay

  const artworks = [
    { src: "/doorMuseum2/door1.jpg", title: "Simile (1980, Barcelona)" },
    { src: "/doorMuseum2/door2.jpg", title: "Reminiscencia No. 5 (1979, Brno)" },
    { src: "/doorMuseum2/door3.jpg", title: "Abismo y Precipio (1971)" },
    { src: "/doorMuseum2/door4.jpg", title: "Metaphor (1980)" },
    { src: "/doorMuseum2/door5.jpg", title: "Apotheosis (1980, Barcelona)" },
    { src: "/doorMuseum2/door6.jpg", title: "Spring in the Alley (1975)" },
    { src: "/doorMuseum2/door7.jpg", title: "Reminiscencia No. 23 (1979, Brno)" },
    { src: "/doorMuseum2/door8.jpg", title: "Autumn Night (1970, Manila)" },
    { src: "/doorMuseum2/door9.jpg", title: "The Loggia (1975)" },
    { src: "/doorMuseum2/door10.jpg", title: "Encounter D (1980, Barcelona)" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        color: "white",
        display: "flex",
        zIndex: 2000,
        animation: "fadeIn 0.5s ease-in",
      }}
    >
      {/* Artist Info Left Side */}
      <div
        style={{
          width: "25%",
          padding: "40px 30px",
          borderRight: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <img
          src="/images/artist.jpg"
          alt="Artist Portrait"
          style={{
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "20px",
            border: "4px solid rgba(255, 255, 255, 0.7)",
            boxShadow: "0 0 25px rgba(255,255,255,0.5)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 0 40px rgba(255,255,255,0.9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 0 25px rgba(255,255,255,0.5)";
          }}
        />
        <h2
          style={{
            marginBottom: "10px",
            fontSize: "28px",
            textShadow: "0 0 10px rgba(255,255,255,0.6)",
          }}
        >
          Federico Alcuaz Aguilar
        </h2>
        <p style={{ fontStyle: "italic", marginBottom: "20px", fontSize: "18px" }}>
          “Artworks of Mr. Aguilar”
        </p>
        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.6",
            opacity: 0.9,
            textAlign: "justify",
          }}
        >
          Federico Aguilar Alcuaz was an award-winning Filipino artist who
          exhibited extensively internationally and earned recognition both in
          the Philippines and abroad.
        </p>

        {/* Buttons */}
        <div style={{ marginTop: "40px", width: "100%" }}>
          <button
            onClick={onBackRoom}
            style={{
              width: "100%",
              padding: "14px 0",
              fontSize: "18px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              background: "linear-gradient(135deg, #b80000, #ff2e2e)",
              color: "white",
              boxShadow: "0 4px 15px rgba(255, 0, 0, 0.5)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              marginBottom: "15px",
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
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "14px 0",
              fontSize: "18px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              background: "linear-gradient(135deg, #555, #999)",
              color: "white",
              boxShadow: "0 4px 15px rgba(255,255,255,0.3)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(255,255,255,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(255,255,255,0.3)";
            }}
          >
            Cancel ✕
          </button>
        </div>
      </div>

      {/* Right Section for Artwork of Federico */}
      <div
        style={{
          width: "75%",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "35px",
          padding: "50px",
          overflowY: "auto",
          justifyItems: "center",
        }}
      >
        {artworks.map((art, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              color: "white",
              width: "250px",
              animation: "floatUpDown 3s ease-in-out infinite",
              cursor: "pointer",
            }}
            onClick={() => setSelectedImage(art)} // ✅ click-to-zoom
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
            <h3
              style={{
                marginTop: "12px",
                fontSize: "18px",
                fontWeight: "bold",
                textShadow: "0 0 10px rgba(255,255,255,0.3)",
              }}
            >
              {art.title}
            </h3>
          </div>
        ))}
      </div>

      {/* 🔍 Zoom Overlay */}
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
            zIndex: 5000,
            cursor: "zoom-out",
            animation: "fadeInScale 0.4s ease-out",
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
              animation: "zoomIn 0.4s ease-out",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              color: "#fff",
              textAlign: "center",
              fontSize: "20px",
              animation: "fadeIn 0.6s ease-in",
            }}
          >
            <strong>{selectedImage.title}</strong>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
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
