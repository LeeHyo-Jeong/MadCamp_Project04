import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Canvas from "./components/Canvas";
import Ocean from "./components/Ocean";

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
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Canvas />} />
          <Route path="/ocean" element={<Ocean />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;