import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Canvas from "./components/Canvas";
import "./App.css";
import Login from "./components/login";
import AddDiary from "./components/WriteDiary";

const gradients = [
  "linear-gradient(135deg, #AEECEA, #FAD7E4)",
  "linear-gradient(135deg, #DBC3FC, #93C5FC)",
  "linear-gradient(135deg, #D6A1C4, #FDF6D7)",
  "linear-gradient(135deg, #EAC2FB, #DADDDA)",
];

// add로 되어있는 경로를 wrtie, record, draw 등으로 고치기

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {gradients.map((gradient, index) => (
            <Route
              key={index}
              path={`/add/${index + 1}`}
              element={<AddDiary gradient={gradient} />}
            />
          ))}
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
