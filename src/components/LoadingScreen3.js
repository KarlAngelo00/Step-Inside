import React, { useState } from "react";

export default function LoadingScreen3({
  text = "Preview of Museum 3 ...",
  onContinue,
}) {
  const [selectedImage, setSelectedImage] = useState(null); // 🔥 for zoomed-in image

  const artworks = [
    { src: "/doorMuseum3/1.jpg", title: "Doomed Family", artist: "Isabel de Ramos" },
    { src: "/doorMuseum3/2.jpg", title: "Ravaged Manila", artist: "Arturo Manego" },
    { src: "/doorMuseum3/3.jpg", title: "Rape and Massacre in Ermita",artist: "Diosdado M. Lorenzo"},
    { src: "/doorMuseum3/4.jpg", title: "Japanese Atrocitees", artist: "Manuel Antonio Rodriguez, Sr."},
    { src: "/doorMuseum3/5.jpg", title: "Landing of the Liberation Fortes in Lingayen",artist: "Eduardo Perrenoud" },
    { src: "/doorMuseum3/6.jpg", title: "The Leyte Landing",artist: "Romeo V. Tabuena" },
    { src: "/doorMuseum3/7.jpg", title: "The Burning of Manila", artist: "Fernando Amorsolo Y Cueto" },
    { src: "/doorMuseum3/8.jpg", title: "Bataan", artist: "Fernando Amorsolo Y Cueto"},
    { src: "/doorMuseum3/9.jpg", title: "Evacuation",artist: "Oscar Espiritu" },
    { src: "/doorMuseum3/10.jpg", title: "A traggic Lesson (The Fall of Bataan)", artist: "Gene Cabrera" },
    { src: "/doorMuseum3/11.jpg", title: "Bataan Death Marcher", artist: "Gene Cabrera" },
    { src: "/doorMuseum3/12.jpg", title: "Graveyard Scene", artist: "Carlos Valino, Jr." },
    { src: "/doorMuseum3/13.jpg", title: "Capas", artist: "Demetrio Diego" },
    { src: "/doorMuseum3/14.jpg", title: "Mealtime at the Prison Camp", artist: "Wenceslao S. Garcia" },
    { src: "/doorMuseum3/15.jpg", title: "Death March", artist: "Dominador Castañedo" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.96)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 9999,
        overflowY: "auto",
        animation: "fadeIn 0.5s ease-in",
        padding: "80px 0 60px 0",
        boxSizing: "border-box",
      }}
    >
      {/* 🖋 Loading Text */}
      <div
        style={{
          fontSize: "42px",
          color: "white",
          marginBottom: "40px",
          textShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        {text}
      </div>

      {/* Artwork Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "35px",
          maxWidth: "1200px",
          width: "90%",
          marginBottom: "60px",
        }}
      >
        {artworks.map((art, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              color: "white",
              cursor: "pointer",
              animation: "floatUpDown 3s ease-in-out infinite",
            }}
            onClick={() => setSelectedImage(art)} // open zoom view
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
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {art.title}
            </div>
            <div style={{ fontSize: "15px", opacity: 0.8 }}>
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

      {/* ✨ Animations */}
      <style>
        {`
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
