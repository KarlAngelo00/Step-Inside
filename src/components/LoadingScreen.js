import React from "react";

export default function LoadingScreen({ text = "Loading Next Room..." }) {
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
        animation: "fadeIn 0.3s ease-in",
      }}
    >
      <div
        style={{
          fontSize: "48px",
          color: "white",
          marginBottom: "30px",
          textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
        }}
      >
        {text}
      </div>
      <div
        style={{
          width: "60px",
          height: "60px",
          border: "6px solid rgba(255, 255, 255, 0.2)",
          borderTop: "6px solid white",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
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
        `}
      </style>
    </div>
  );
}