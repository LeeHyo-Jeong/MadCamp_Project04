import React, { useRef, useEffect } from "react";
import { WaveGroup } from "./wavegroup";
import "../Canvas.css";
import Login from "./login";

const Canvas = ({ centerY, onLoginSuccess }) => {
  const canvasRef = useRef(null);
  const waveGroupRef = useRef(new WaveGroup());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      waveGroupRef.current.resize(canvas.width, canvas.height, centerY);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      waveGroupRef.current.draw(ctx);
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    waveGroupRef.current.resize(canvas.width, canvas.height, centerY/1.2);
  }, [centerY]);

  return (
    <div className="canvas-container">
      <div className="canvas-background">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%" }}
        ></canvas>
        <Login onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
};

export default Canvas;
