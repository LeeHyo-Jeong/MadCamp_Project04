import React, { useRef, useEffect, useState } from "react";
import "../drawing.css";

const Drawing = ({ onSave }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [lineWidth, setLineWidht] = useState(5);
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1000;
    canvas.height = 550;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctxRef.current = ctx;
  }, []);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  const finishDrawing = () => {
    ctxRef.current.closePath();
    setDrawing(false);
  };

  const draw = (e) => {
    if (!drawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.strokeStyle = color;
    ctxRef.current.lineWidth = lineWidth;

    ctxRef.current.stroke();
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    onSave(dataURL);
  };

  return (
    <div className="drawing-canvas">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
      <div className="color-palette">
        {[
          "#B20217",
          "#E7001D",
          "#E7492D",
          "#F2884A",
          "#F6CA4B",
          "#FCFB53",
          "#7DFA54",
          "#10AD2E",
          "#12F5F9",
          "#0FA7F2",
          "#072EE9",
          "#6014BE",
          "#C303B9",
          "#8A8B90",
          "#FFFFFF",
          "#000000",
        ].map((c) => (
          <div
            key={c}
            style={{ backgroundColor: c }}
            className="color-swatch"
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      <button className="drawing-save-button" onClick={saveDrawing}>
        그림 완성
      </button>
    </div>
  );
};

export default Drawing;
