import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Canvas from "./components/Canvas";
import "./App.css";
import Login from "./components/login";
import AddDiary from "./components/AddDiary";

const gradients = [
  "linear-gradient(135deg, #e0eaff, #c8d6f4)",
  "linear-gradient(135deg, #f0f0f0, #d9d9d9)",
  "linear-gradient(135deg, #c8d6f4, #b0c4de)",
  "linear-gradient(135deg, #ffcccc, #ff9999)",
  "linear-gradient(135deg, #e0f7fa, #b2ebf2)",
  "linear-gradient(135deg, #e1bee7, #ce93d8)",
  "linear-gradient(135deg, #f8bbd0, #f48fb1)",
  "linear-gradient(135deg, #ffe0b2, #ffcc80)",
];

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
