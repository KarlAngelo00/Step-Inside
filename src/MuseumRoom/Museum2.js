import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import artifacts from "../components/Artifacts";
import SocialMedia from "../SocMed/SocialMedia";
import LoadingScreen2 from "../components/LoadingScreen2";
import "../App.css";

function Panorama({ src }) {
  const texture = useTexture(src);
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={1} />
    </mesh>
  );
}

//  zoom control to enabled/disabled when i view details
function ZoomController({ enabled }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!enabled) return;

    const handleWheel = (event) => {
      event.preventDefault();
      let newFov = camera.fov + event.deltaY * 0.05;
      newFov = Math.min(Math.max(newFov, 35), 100);
      camera.fov = newFov;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [camera, enabled]);

  return null;
}

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
          {(title || artist) && (
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                color: "#e0dbcaff",
                fontWeight: "bold",
                textShadow: "0 0 8px black",
                display: "inline-block",
                whiteSpace: "nowrap",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                padding: "5px 10px",
                borderRadius: "10px",
                maxWidth: "250px",
              }}
            >
              {title && <span>{title}</span>} 
              {artist && (
                <div
                  style={{
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: "#d0d0d0",
                    marginTop: "4px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {artist}
                </div>
              )}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

function NavigationArrow({ position = [120, -40, -100], onClick }) {
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
            textAlign: "center",
            color: "white",
            textShadow: "0 0 10px black",
            userSelect: "none",
          }}
        >
          <div
            onClick={onClick}
            style={{
              fontSize: "80px",
              cursor: "pointer",
              lineHeight: "60px",
            }}
          >
            🡱
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "4px",
              cursor: "pointer",
            }}
            onClick={onClick}
          >
            Next Room
          </div>
        </div>
      </Html>
    </group>
  );
}

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

export default function Museum2({ onNextRoom }) {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [showLoading2, setShowLoading2] = useState(false);

  const handleArtifactClick = (artifact) => {
    setSelectedArtifact(artifact);
  };

  const handleClosePopup = () => {
    setSelectedArtifact(null);
  };

  const handleNextRoom = () => {
    setShowLoading2(true);
  };

  if (showLoading2) {
    return (
      <LoadingScreen2 text="Preview of Museum 2 ..." onContinue={onNextRoom} />
    );
  }

  return (
    <div className="app-container">
      <SocialMedia />

      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <Suspense fallback={null}>
          <Panorama src="/panos/museum2.jpg" />

          {/* Enable zoom only when no artifact is open */}
          <ZoomController enabled={!selectedArtifact} />

          {!selectedArtifact &&
            artifacts.map((art) => (
              <InfoMarker
                key={art.id}
                position={art.position}
                onClick={() => handleArtifactClick(art)}
                title={art.title}
                artist={art.artist}
              />
            ))}

          {!selectedArtifact && (
            <NavigationArrow
              position={[120, -40, -100]}
              onClick={handleNextRoom}
            />
          )}

          {/* OrbitControls keeps view stable, zoom handled manually */}
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>

      {/* Artifact popup — kept fully intact */}
      {selectedArtifact && (
        <>
          <div
            onClick={handleClosePopup}
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

          {/* for when the artifact view popup window */}
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
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 215, 0, 0.1)",
              zIndex: 1000,
              overflowY: "auto",
              animation: "slideUp 0.4s ease-out",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              padding: "40px 30px",
            }}
          >
            <button
              onClick={handleClosePopup}
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
                e.currentTarget.style.background =
                  "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "rotate(0deg) scale(1)";
                e.currentTarget.style.borderColor =
                  "rgba(255, 255, 255, 0.3)";
              }}
            >
              ✕
            </button>

            {/* popup contents remain exactly as before */}
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

              {/* Citation Section */}
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
