import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import artifacts from "./components/Artifacts";
import SocialMedia from "./SocMed/SocialMedia";
import "./App.css";

console.log(artifacts);

function Panorama({ src }) {
  const texture = useTexture(src);
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={1} />
    </mesh>
  );
}

function InfoMarker({ position, onClick, hasVideo = false }) {
  return (
    <group position={position}>
      <mesh
        onClick={onClick}
        onPointerOver={(e) => (
          e.stopPropagation(), (document.body.style.cursor = "pointer")
        )}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <circleGeometry args={[5, 32]} />
        <meshBasicMaterial color="blue" transparent opacity={0} />
      </mesh>

      <Html center>
        <div
          className="info-marker"
          onClick={onClick}
          style={{ cursor: "pointer" }}
        >
          {hasVideo ="?"}
        </div>
      </Html>
    </group>
  );
}

// YouTube embed URL builder with JS API enabled
function getYouTubeEmbedUrl(videoId) {
  if (!videoId) return "";
  let id = videoId;

  if (videoId.includes("youtube.com/watch?v=")) {
    id = videoId.split("youtube.com/watch?v=")[1].split("&")[0];
  } else if (videoId.includes("youtu.be/")) {
    id = videoId.split("youtu.be/")[1].split("?")[0];
  } else if (videoId.includes("youtube.com/embed/")) {
    id = videoId.split("youtube.com/embed/")[1].split("?")[0];
  }

  return `https://www.youtube.com/embed/${id}?enablejsapi=1`;
}

export default function App() {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const audioRef = useRef(null);

  // Background music setup
  useEffect(() => {
    const audio = new Audio("/music/bg-music.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    audio
      .play()
      .then(() => {
        console.log("🎵 Background music started");
      })
      .catch(() => {
        console.log("⚠️ Autoplay blocked, waiting for user click...");
        const resume = () => {
          audio.play().then(() => {
            console.log("🎵 Background music resumed after click");
          });
          document.removeEventListener("click", resume);
        };
        document.addEventListener("click", resume);
      });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Artifact click handler
  const handleArtifactClick = (artifact) => {
    setSelectedArtifact(artifact);
  };

  // Detect when YouTube video actually plays
  useEffect(() => {
    if (!selectedArtifact?.videoId) return;

    const iframe = document.querySelector("iframe");
    if (!iframe) return;

    const handleMessage = (event) => {
      if (
        typeof event.data === "object" &&
        event.data?.event === "infoDelivery" &&
        event.data.info?.playerState === 1
      ) {
        // 1 = playing
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          console.log("🎥 YouTube video started -> paused background music");
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [selectedArtifact]);

  // Close popup and resume music
  const handleClosePopup = () => {
    setSelectedArtifact(null);
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((e) => console.log("Music resume failed:", e));
      console.log("🎵 Background music resumed after popup closed");
    }
  };

  return (
    <div className="app-container">
      <SocialMedia />

      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <Suspense fallback={null}>
          <Panorama src="/panos/museum2.jpg" />

          {!selectedArtifact &&
            artifacts.map((art) => (
              <InfoMarker
                key={art.id}
                position={art.position}
                onClick={() => handleArtifactClick(art)}
                hasVideo={!!art.videoId}
              />
            ))}

          <OrbitControls enableZoom={true} enablePan={false} />
        </Suspense>
      </Canvas>

      {selectedArtifact && (
        <div className="artifact-popup">
          <h2>{selectedArtifact.title}</h2>

          {selectedArtifact.artist && (
            <p
              style={{
                fontSize: "16px",
                fontStyle: "italic",
                marginTop: "-15px",
                marginBottom: "25px",
                opacity: 0.9,
              }}
            >
              by {selectedArtifact.artist}
            </p>
          )}

          {selectedArtifact.image && (
            <img
              src={selectedArtifact.image}
              alt={selectedArtifact.title}
              style={{
                maxWidth: "100%",
                borderRadius: "12px",
                margin: "20px 0",
              }}
            />
          )}

          {selectedArtifact.videoId && (
  <>
    <iframe
      src={getYouTubeEmbedUrl(selectedArtifact.videoId)}
      title={`${selectedArtifact.title} - Video`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      width="560"
      height="315"
    />

    {/* for citation link */}
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
        href={selectedArtifact.videoId}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#4da6ff" }}
      >
        {selectedArtifact.videoId}
      </a>
    </p>
  </>
)}

          <p>{selectedArtifact.description}</p>
          <button className="close-btn" onClick={handleClosePopup}>
            ✖ Close
          </button>
        </div>
      )}
    </div>
  );
}
