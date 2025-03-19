import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function FindMovie() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(search || "");

  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm);
    }
  }, []);

  const fetchMovies = async (term) => {
    setLoading(true);
    const apiKey = "31ebf24f";
    const startTime = Date.now();

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${term}&apikey=${apiKey}`
      );
      const data = await response.json();
      console.log("API Response:", data);

      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 1500) {
        await new Promise((resolve) => setTimeout(resolve, 1500 - elapsedTime));
      }

      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      fetchMovies(searchTerm.trim());
    }
    setTimeout(() => {
      fetchMovies(searchTerm.trim());
    }, 2000);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="findmovie-page">
      <div className="findmovie-content">
        <div className="search-container">
          <input
            type="text"
            className="input-search__find-movie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => handleEnterKey(e)}
          />

          <button
            className="search-button__find-movie"
            onClick={handleSearchClick}
            disabled={loading}
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
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
        </div>
      </div>

      <h1 className="search-results__text">
          Search Results for "{searchTerm}"
        </h1>
      <div className="movie-list">
       
        {movies.map((movie, index) => (
          <div
            className="user-card"
            key={index}
            onClick={() => handleMovieClick(movie.imdbID)}
          >
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

      {/* <div className="year-range-container">
        <input
          type="range"
          id="min-year"
          min="1900"
          max="2025"
          defaultValue={yearRange.minYear}
          onInput={enforceSliderRules}
        />
        <input
          type="range"
          id="max-year"
          min="1900"
          max="2025"
          defaultValue={yearRange.maxYear}
          onInput={enforceSliderRules}
        />
        <div id="year-range">
          {yearRange.minYear} - {yearRange.maxYear}
        </div>
      </div> */}
    </div>
  );
}

export default FindMovie;
