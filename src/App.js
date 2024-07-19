import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Canvas from "./components/Canvas";
import "./App.css";
import Login from "./components/login";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="canvas-container">
          <Login />
          <Canvas />
        </div>
        <Routes>
          <Route path="/" element={<Canvas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
