import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FindMovie from "./components/FindMovie";
import "./styles.css";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  return (
    <Router>
      <div id="app">
        <nav className="navbar">
          <a href="/" class="logo">
            <div className="logo">
              <img src="./assets/streamReel.logo.png" alt="" />
            </div>
          </a>
          <ul className="nav-links">
            <li className="home-link">
              <Link to="/">Home</Link>
            </li>
            <li className="find-movie">
              <Link to="/find-movie">Find your movie</Link>
            </li>
          </ul>
          <div className="contact-button">
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-movie" element={<FindMovie />} />
          <Route path="/find-movie/:searchTerm" element={<FindMovie />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
