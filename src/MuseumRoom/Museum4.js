import React, { useState, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import artifacts from "../components/Artifacts3";
import LoadingScreen2 from "../components/LoadingScreen2";

function getYouTubeEmbedUrl(videoId) {
  if (!videoId) return "";
  if (videoId.endsWith(".mp4")) return videoId;
  let id = videoId;
  if (videoId.includes("youtube.com/watch?v="))
    id = videoId.split("youtube.com/watch?v=")[1].split("&")[0];
  else if (videoId.includes("youtu.be/"))
    id = videoId.split("youtu.be/")[1].split("?")[0];
  else if (videoId.includes("youtube.com/embed/"))
    id = videoId.split("youtube.com/embed/")[1].split("?")[0];
  return `https://www.youtube.com/embed/${id}?enablejsapi=1`;
}

// Panorama background
function Panorama({ src }) {
  const texture = useTexture(src);
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={1} />
    </mesh>
  );
}

// Zoom control (mouse wheel)
function ZoomController({ enabled = true }) {
  const { camera } = useThree();
  useEffect(() => {
    const handleWheel = (e) => {
      if (!enabled) return;
      const zoomSpeed = 0.0015;
      const newFov = camera.fov + e.deltaY * zoomSpeed * 100;
      camera.fov = Math.min(100, Math.max(40, newFov));
      camera.updateProjectionMatrix();
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [camera, enabled]);
  return null;
}

// Artifact label marker
function InfoMarker({ position, onClick, title, artist }) {
  return (
    <group position={position}>
      <Html center>
        <div
          onClick={onClick}
          style={{
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
            cursor: "pointer",
            textShadow: "0 0 15px black, 0 0 10px #ffa500",
            userSelect: "none",
            transition: "transform 0.2s ease",
            textAlign: "center",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
        >
          <div
            style={{
              marginTop: "8px",
              fontSize: "18px",
              color: "#e0dbcaff",
              fontWeight: "bold",
              textShadow: "0 0 8px black",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              padding: "10px 14px",
              borderRadius: "10px",
              display: "inline-block",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ fontSize: "12px", color: "#fff" }}>{title}</div>
            <div style={{ fontSize: "10px", fontStyle: "italic", color: "#cfcfcf" }}>
              {artist}
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

// Navigation arrow
function NavigationArrow({ position, onClick, label }) {
  return (
    <group position={position}>
      <mesh
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <circleGeometry args={[6, 32]} />
        <meshBasicMaterial color="yellow" transparent opacity={0.0} />
      </mesh>

      <Html center>
        <div
          style={{
            fontSize: "60px",
            color: "white",
            cursor: "pointer",
            textShadow: "0 0 10px black",
          }}
          onClick={onClick}
        >
          🡵
        </div>
        {label && (
          <div
            style={{
              marginTop: "10px",
              fontSize: "22px",
              color: "#e0dbcaff",
              fontWeight: "bold",
              textShadow: "0 0 5px black",
            }}
          >
            {label}
          </div>
        )}
      </Html>
    </group>
  );
}

// Main Museum4
export default function Museum4({ onBackRoom }) {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableZoom = !selectedArtifact;
    }
  }, [selectedArtifact]);

  const handleReturnClick = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      onBackRoom();
    }, 1500);
  };

  if (showLoading) {
    return <LoadingScreen2 text="Returning to Museum Room 2..." />;
  }

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <Panorama src="/panos/museum4.jpg" />
        <ZoomController enabled={!selectedArtifact} />
        <OrbitControls ref={controlsRef} enablePan={false} />

        {!selectedArtifact &&
          artifacts.map((artifact) => (
            <InfoMarker
              key={artifact.id}
              position={artifact.position}
              onClick={() => setSelectedArtifact(artifact)}
              title={artifact.title}
              artist={artifact.artist}
            />
          ))}

        {!selectedArtifact && (
          <NavigationArrow
            position={[150, -120, -300]}
            onClick={handleReturnClick}
            label="Return"
          />
        )}
      </Canvas>

      {selectedArtifact && (
        <>
          <div
            onClick={() => setSelectedArtifact(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(10px)",
              zIndex: 999,
              animation: "fadeIn 0.3s ease",
            }}
          />

          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              borderRadius: "24px",
              width: "90%",
              maxWidth: "900px",
              maxHeight: "90vh",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 215, 0, 0.1)",
              zIndex: 1000,
              overflowY: "auto",
              animation: "slideUp 0.4s ease-out",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              padding: "40px 30px",
            }}
          >
            <button
              onClick={() => setSelectedArtifact(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "50%",
                width: "45px",
                height: "45px",
                cursor: "pointer",
                fontSize: "24px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 50, 50, 0.8)";
                e.currentTarget.style.transform = "rotate(90deg) scale(1.1)";
                e.currentTarget.style.borderColor = "#ff3232";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "rotate(0deg) scale(1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
              }}
            >
              ✕
            </button>

            <div
              style={{
                textAlign: "center",
                marginBottom: "30px",
                paddingBottom: "20px",
                borderBottom: "2px solid rgba(255, 215, 0, 0.3)",
              }}
            >
              <h2
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#ffd700",
                  margin: "0 0 10px 0",
                  textShadow: "0 2px 10px rgba(255, 215, 0, 0.3)",
                }}
              >
                {selectedArtifact.title}
              </h2>
              {selectedArtifact.artist && (
                <p
                  style={{
                    fontSize: "18px",
                    fontStyle: "italic",
                    color: "#b0b0b0",
                    margin: "5px 0 0 0",
                  }}
                >
                  by {selectedArtifact.artist}
                </p>
              )}
            </div>

            {selectedArtifact.image && (
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <img
                  src={selectedArtifact.image}
                  alt={selectedArtifact.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "60vh",
                    borderRadius: "16px",
                    objectFit: "contain",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
                    border: "3px solid rgba(255, 215, 0, 0.2)",
                  }}
                />
              </div>
            )}

            {selectedArtifact.videoId && (
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                {selectedArtifact.videoId.endsWith(".mp4") ? (
                  <video
                    src={selectedArtifact.videoId}
                    controls
                    style={{
                      width: "100%",
                      borderRadius: "16px",
                      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
                    }}
                  />
                ) : (
                  <iframe
                    src={getYouTubeEmbedUrl(selectedArtifact.videoId)}
                    title={`${selectedArtifact.title} - Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    width="100%"
                    height="400"
                    style={{
                      borderRadius: "16px",
                      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
                    }}
                  />
                )}

                {selectedArtifact.citation && (
                  <p
                    style={{
                      fontSize: "14px",
                      fontStyle: "italic",
                      color: "#ddd",
                      marginTop: "8px",
                      textAlign: "center",
                    }}
                  >
                    Source:{" "}
                    <a
                      href={selectedArtifact.citation}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#4da6ff" }}
                    >
                      {selectedArtifact.citation}
                    </a>
                  </p>
                )}
              </div>
            )}

            {selectedArtifact.description && (
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "25px",
                  borderRadius: "16px",
                  marginTop: "25px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    color: "#ffd700",
                    marginTop: "0",
                    marginBottom: "15px",
                    fontWeight: "600",
                  }}
                >
                  About this Artifact
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.8",
                    color: "#e0e0e0",
                    margin: "0",
                    textAlign: "justify",
                  }}
                >
                  {selectedArtifact.description}
                </p>
              </div>
            )}
          </div>

          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes slideUp {
                from { opacity: 0; transform: translate(-50%, -40%); }
                to { opacity: 1; transform: translate(-50%, -50%); }
              }
            `}
          </style>
        </>
      )}
    </div>
  );
}