import React, { useRef, useEffect } from "react";
import { WaveGroup } from "./wavegroup";
import { setupWaveAnimation } from "../waveFunctions";
import "../Canvas.css";
import Login from "./login";

const Canvas = () => {
  const canvasRef = useRef(null);
  const waveGroupRef = useRef(null);

  useEffect(() => {
    //console.log("useEffect triggered");

    if (canvasRef.current) {
      //console.log("Canvas ref is valid");
      const cleanup = setupWaveAnimation(canvasRef, waveGroupRef);
      return cleanup;
    }
  }, []);

  return (
    <div className="canvas-container">
      <div className = "canvas-background">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%" }}
        ></canvas>
        <Login />
      </div>
    </div>
  );
};

export default Canvas;