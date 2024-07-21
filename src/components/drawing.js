import React, { useRef, useEffect, useState } from "react";
import "../drawing.css";
import eraser from "../images/eraser.png";
import bucket from "../images/bucket.png";

const Drawing = ({ onSave }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [color, setColor] = useState("#000000");
  const [isErasing, setIsErasing] = useState(false);

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

    if (isErasing) ctxRef.current.strokeStyle = "white";
    else ctxRef.current.strokeStyle = color;
    ctxRef.current.lineWidth = lineWidth;

    ctxRef.current.stroke();
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    onSave(dataURL);
  };

  const paintCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
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
              onClick={() => {
                setIsErasing(false);
                setColor(c);
              }}
            />
          ))}
        </div>
      </div>
      <div className="toolbar">
        <input
          type="range"
          min="1"
          max="30"
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
          className="line-width-slider"
        />
        <img
          src={eraser}
          className="drawing-icon-button"
          onClick={() => setIsErasing(true)}
        />
        <img
          src={bucket}
          className="drawing-icon-button"
          onClick={() => paintCanvas()}
        />
        <button className="drawing-save-button" onClick={saveDrawing}>
          그림 완성
        </button>
      </div>
    </div>
  );
};

export default Drawing;
