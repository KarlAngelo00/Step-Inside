
import React from "react";
import { Html } from "@react-three/drei";

export default function ArtLabel({ artifact }) {
  
  const labelPositions = {
    1: [100, 10, -120],      // Simile 
    2: [5, 10, -160],     // Reminiscencia No. 5
    3: [-70, 5, -100],     // Abismo y Precipio 
    4: [-240, -60, -50],     // Metaphor 
    5: [-120, -30, 10],      // Apotheosis 
    6: [-50, 10, 90],       // Spring in the Alley 
    7: [25, 10, 120],      // Reminiscencia No. 23 
    8: [80, 10, 100],        // Autumn Night 
    9: [240, -53, 100],      // The Loggia 
    10: [110, -23, -25],     // Encounter D 
  };

  // Get the specific position for this artifact
  const labelPosition = labelPositions[artifact.id];

  return (
    <Html position={labelPosition} center>
      <div
        style={{
          background: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "10px 15px",
          borderRadius: "8px",
          fontSize: "12px",
          textAlign: "center",
          maxWidth: "220px",
          lineHeight: "1",
          backdropFilter: "blur(5px)",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        }}
      >
        <strong style={{ fontSize: "15px", display: "block", marginBottom: "5px" }}>
          {artifact.title}
        </strong>
        <em style={{ fontSize: "13px", display: "block", color: "#e0e0e0" }}>
          {artifact.artist}
        </em>
      </div>
    </Html>
  );
}