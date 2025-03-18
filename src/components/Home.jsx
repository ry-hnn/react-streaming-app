import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";


function Home () {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/find-movie?searchTerm=${encodeURIComponent(searchTerm.trim())}`);
  };


  const fetchMovies = async (searchTerm) => {
    const apiKey = "31ebf24f"; // Your OMDB API key
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`
      );
      const data = await response.json();
      console.log("API Response:", data);
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      setLoading(true);
      fetchMovies(searchTerm.trim()).finally(() => {
        setTimeout(() => setLoading(false), 1500);
        navigate(`/find-movie?search=${encodeURIComponent(searchTerm.trim())}`);
      });
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };


  return (
    <div>
      <section>
        <div className="landing-page">
          <div className="header-landing">
            <h1 className="header">
              Streaming <span className="purple-text">Redefined</span>
            </h1>
            <h2 className="header-search">
              Discover new movies and shows with StreamReel
            </h2>
          </div>
          <div className="search-container">
            <div className="search-bar">
              <input
                className="input-search"
                placeholder="Search movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => handleEnterKey(e)}
              />
            </div>
            <button className="search-button" onClick={handleSearchClick}>
              {loading ? (
                <i className="fa-spinner fa-spin"></i>
              ) : (
                <svg
                  className="search-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              )}
            </button>
            {loading && <i className="fa-spinner fa-spin"></i>}
          </div>
          <div>
            <img
              className="movienight-img"
              src="./assets/undraw_movie_night_re_9umk.svg"
              alt="Movie Night Illustration"
            />
          </div>
          <div className="user-list">
            {movies.map((movie, index) => (
              <div className="user-card" key={index}>
                <div className="user-card__container">
                  <h3>{movie.Title}</h3>
                  <p>
                    <b>Year:</b> {movie.Year}
                  </p>
                  <p>
                    <b>Type:</b> {movie.Type}
                  </p>
                  <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="search">
        <div className="progress-bar">
          <div className="progress-bar-track"></div>
          <div className="progress-bar-fill"></div>
          <div className="progress-bar-buffer"></div>
        </div>
        <div id="filter" className="content-wrapper">
          <h1 className="search-info"></h1>
        </div>
      </section>
    </div>
  );
}

export default Home;
