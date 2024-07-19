import React, { useRef, useEffect } from "react";
import { WaveGroup } from "./wavegroup";
import { setupWaveAnimation } from "../waveFunctions";

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
    <div>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
      ></canvas>
    </div>
  );
};

export default Canvas;
