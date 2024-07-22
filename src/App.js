import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Canvas from "./components/Canvas";
import Ocean from "./components/Ocean";
import Login from "./components/login";
import WriteDiary from "./components/WriteDiary";
import DrawingDiary from "./components/DrawingDiary";
import RecordingDiary from "./components/RecordingDiary";

const gradients = [
  "linear-gradient(135deg, #AEECEA, #FAD7E4)",
  "linear-gradient(135deg, #DBC3FC, #93C5FC)",
  "linear-gradient(135deg, #D6A1C4, #FDF6D7)",
  "linear-gradient(135deg, #EAC2FB, #DADDDA)",
];

const writeTypes = {
  1: "text",
  2: "draw",
  3: "audio",
};

// add로 되어있는 경로를 wrtie, record, draw 등으로 고치기

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Canvas</Link>
            </li>
            <li>
              <Link to="/ocean">Ocean</Link>
            </li>
            <li>
              <Link to="/add/text">Add text</Link>
              <Link to="/add/draw">Add draw</Link>
              <Link to="/add/audio">Add audio</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Canvas />} />
          <Route path="/ocean" element={<Ocean />} />
          <Route
            path="/add/text"
            element={<WriteDiary gradient={gradients[0]} />}
          />
          <Route
            path="/add/draw"
            element={<DrawingDiary gradient={gradients[1]} />}
          />
          <Route
            path="/add/audio"
            element={<RecordingDiary gradient={gradients[2]} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div className="canvas-container">
      <Login />
      <Canvas />
      <div className="home"></div>
    </div>
  );
};

export default App;
