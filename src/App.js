import React, { useState, useRef } from "react";
import LandingPage from "./components/LandingPage";
import Museum2 from "./MuseumRoom/Museum2";
import Museum3 from "./MuseumRoom/Museum3";
import Museum4 from "./MuseumRoom/Museum4"; // ✅ add this
import SocialMedia from "./SocMed/SocialMedia";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [currentRoom, setCurrentRoom] = useState("landing");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  // 🎵 Background Music Toggle
  const toggleMusic = () => {
    if (!audioRef.current) {
      const audio = new Audio("/music/bg-music.mp3");
      audio.loop = true;
      audio.volume = 0.25;
      audioRef.current = audio;
    }
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => console.log("Play failed"));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  // 🔊 Click sound effect
  const playClickSound = () => {
    const sound = new Audio("/sounds/click.wav");
    sound.volume = 0.7;
    sound.play().catch(() => console.log("Sound effect failed to play"));
  };

  // 🧭 Navigation with loading screen
  const navigateToRoom = (roomName, loadingMessage) => {
    playClickSound();
    setLoadingText(loadingMessage);
    setIsLoading(true);

    setTimeout(() => {
      setCurrentRoom(roomName);
      setIsLoading(false);
    }, 1500);
  };

  // ❓ Help button
  const handleHelpClick = () => {
    playClickSound();
    alert("This is the help/info section!");
  };

  // 🏛️ Room rendering
  const renderRoom = () => {
    switch (currentRoom) {
      case "landing":
        return (
          <LandingPage
            onEnter={() =>
              navigateToRoom("museum2", "Entering Museum Room 1...")
            }
          />
        );

      case "museum2":
        return (
          <Museum2
            onNextRoom={() =>
              navigateToRoom("museum3", "Entering Museum Room 2...")
            }
            onHelpClick={handleHelpClick}
          />
        );

      case "museum3":
  return (
    <Museum3
      onBackRoom={() =>
        navigateToRoom("museum2", "Returning to Museum Room 1...")
      }
      onGoRoom4={() =>
        navigateToRoom("museum4", "Entering Museum Room 3...")
      }
      onHelpClick={handleHelpClick}
    />
  );

            case "museum4":
        return (
          <Museum4
            onBackRoom={() =>
              navigateToRoom("museum3", "Returning to Museum Room 2...")
            }
            onGoRoom5={() =>
              navigateToRoom("museum5", "Entering Museum Room 5...")
            }
          />
        );


      default:
        return null;
    }
  };

  const isLanding = currentRoom === "landing";

  // 🎛️ UI + Room rendering
  return (
    <div className="app-container">
      {isLoading ? (
        <LoadingScreen text={loadingText} />
      ) : (
        <>
          {!isLanding && (
            <>
              <SocialMedia />

              {/* 🎵 Music Toggle Button */}
              <div
                onClick={() => {
                  playClickSound();
                  toggleMusic();
                }}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "60px",
                  height: "34px",
                  backgroundColor: isMusicPlaying ? "#4CAF50" : "#ccc",
                  borderRadius: "34px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  zIndex: 1000,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 4px",
                }}
              >
                <div
                  style={{
                    height: "26px",
                    width: "26px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    transition: "transform 0.3s",
                    transform: isMusicPlaying
                      ? "translateX(26px)"
                      : "translateX(0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                  }}
                >
                  {isMusicPlaying ? "Off" : "On"}
                </div>
              </div>
            </>
          )}

          {renderRoom()}
        </>
      )}
    </div>
  );
}
